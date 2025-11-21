import { WidgetFooter } from "../components/widget-footer";
import { WidgetHeader } from "../components/widget-header";

export const WidgetSelectionScreen = () => {
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 font-semibold">
          <p className="text-3xl">Hi there 👋</p>
          <p className="text-lg">Let&apos;s get started!</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-1">Selection Screen</div>
      <WidgetFooter />
    </>
  );
};
