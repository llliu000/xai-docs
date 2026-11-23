import type { ReactNode } from "react";
import { ChevronRight } from "zudoku/icons";

const officialReference =
  "https://console.volcengine.com/ark/region:cn-beijing/docs/create-video-generation-task-api";
const queryReference =
  "https://console.volcengine.com/ark/region:cn-beijing/docs/get-video-generation-task-api";

type ApiFieldProps = {
  name: string;
  type: string;
  label?: string;
  required?: boolean | "conditional";
  defaultValue?: string;
  sourceUrl?: string;
  sourceText?: string;
  children: ReactNode;
};

export function ApiField({
  name,
  type,
  label,
  required,
  defaultValue,
  sourceUrl = officialReference,
  sourceText = label ?? name,
  children,
}: ApiFieldProps) {
  const fragment = encodeURIComponent(sourceText).replaceAll("-", "%2D");

  return (
    <details className="ark-api-field">
      <summary>
        <ChevronRight size={16} aria-hidden="true" />
        <span className="ark-api-field-heading">
          <code>{name}</code>
          <span className="ark-api-field-type">{type}</span>
          {required && (
            <span className="ark-api-field-required">
              {required === "conditional" ? "按场景必填" : "必填"}
            </span>
          )}
          {defaultValue !== undefined && <span>默认 {defaultValue}</span>}
          {label && <span>{label}</span>}
        </span>
      </summary>
      <div className="ark-api-field-description">
        {children}
        <p className="text-sm">
          <a
            href={`${sourceUrl}#:~:text=${fragment}`}
            target="_blank"
            rel="noopener"
            aria-label={`查看 ${label ?? name} 的官方原文`}
          >
            查看官方原文
          </a>
        </p>
      </div>
    </details>
  );
}

export function QueryApiField(props: Omit<ApiFieldProps, "sourceUrl">) {
  return <ApiField {...props} sourceUrl={queryReference} />;
}
