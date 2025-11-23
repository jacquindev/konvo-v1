import { Integration } from "./types";

export const INTEGRATIONS: Integration[] = [
  {
    id: "html",
    title: "HTML",
    icon: "/html5.svg",
  },
  {
    id: "javascript",
    title: "JavaScript",
    icon: "/javascript.svg",
  },
  {
    id: "nextjs",
    title: "NextJS",
    icon: "/nextjs.svg",
  },
  {
    id: "react",
    title: "React",
    icon: "/react.svg",
  },
];

export const HTML_SCRIPT = `<script src="${process.env.NEXT_PUBLIC_WIDGET_URL}/widget.js" data-organization-id="{{ORGANIZATION_ID}}"></script>`;
export const JAVASCRIPT_SCRIPT = `<script src="${process.env.NEXT_PUBLIC_WIDGET_URL}/widget.js" data-organization-id="{{ORGANIZATION_ID}}"></script>`;
export const NEXTJS_SCRIPT = `<script src="${process.env.NEXT_PUBLIC_WIDGET_URL}/widget.js" data-organization-id="{{ORGANIZATION_ID}}"></script>`;
export const REACT_SCRIPT = `<script src="${process.env.NEXT_PUBLIC_WIDGET_URL}/widget.js" data-organization-id="{{ORGANIZATION_ID}}"></script>`;
