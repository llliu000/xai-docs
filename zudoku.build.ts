import type { Root } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import type { PluggableList } from "unified";
import { visit } from "unist-util-visit";

const configuredBaseUrl = process.env.ZUDOKU_PUBLIC_API_BASE_URL?.trim();

const normalizeBaseUrl = (value: string) => {
  const url = URL.parse(value);
  if (
    !url ||
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    /[?#\\]/.test(value)
  ) {
    throw new Error(
      "ZUDOKU_PUBLIC_API_BASE_URL must be an HTTP(S) base URL without credentials, a query, or a fragment.",
    );
  }
  return url.href.replace(/\/+$/, "");
};

const base_url = configuredBaseUrl ? normalizeBaseUrl(configuredBaseUrl) : "";
const shellBaseUrl = base_url.replace(/[$`"\\]/g, "\\$&");

const getAttribute = (node: MdxJsxFlowElement, name: string) => {
  const attribute = node.attributes.find(
    (attribute) => attribute.type === "mdxJsxAttribute" && attribute.name === name,
  );
  return typeof attribute?.value === "string" ? attribute.value : undefined;
};

const remarkApiBaseUrl = () => (tree: Root) => {
  let exampleBaseUrl: string | undefined;

  visit(tree, "mdxJsxFlowElement", (node) => {
    if (node.name !== "code") return;
    const path = getAttribute(node, "apiPath");
    const defaultBaseUrl = getAttribute(node, "defaultBaseUrl");
    if (!path || !defaultBaseUrl) return;

    exampleBaseUrl =
      shellBaseUrl || getAttribute(node, "exampleBaseUrl") || defaultBaseUrl;
    const address = `${base_url || defaultBaseUrl}${path}`;
    node.attributes = [];
    node.children = [
      {
        type: "mdxFlowExpression",
        value: JSON.stringify(address),
        data: {
          estree: {
            type: "Program",
            sourceType: "module",
            body: [
              { type: "ExpressionStatement", expression: { type: "Literal", value: address } },
            ],
          },
        },
      },
    ];
  });

  if (!exampleBaseUrl) return;
  const curlBaseUrl = exampleBaseUrl;
  visit(tree, "code", (node) => {
    if (node.lang === "sh") {
      node.value = node.value.replaceAll('"${base_url}/', () => `"${curlBaseUrl}/`);
    }
  });
};

export default {
  // Resolve request addresses before Zudoku turns fenced examples into tabs.
  remarkPlugins: (plugins: PluggableList) => [remarkApiBaseUrl, ...plugins],
};
