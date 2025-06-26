// components/DashboardWidget.tsx
import React from "react";

interface DashboardWidgetProps {
  title: string;
  value?: string | number;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  value,
  icon,
  footer,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow p-4 h-32 flex flex-col item-start justify-center gap-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
        {icon && <div className="text-xl text-primary-500">{icon}</div>}
      </div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {footer && (
        <div className="text-xs text-muted-foreground mt-1">{footer}</div>
      )}
    </div>
  );
};

export default DashboardWidget;
