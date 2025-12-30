import React, { useMemo, useRef, useState, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";
import Image from "next/image";
import { Box, Typography, useTheme } from "@mui/material";
import useIsMobile from "@/hooks/useIsMobile";
import CalendarTodayIcon from "@/assets/Icons/calendar-icon.svg";
import RoundedStackIcon from "@/assets/Icons/roundedStck-icon.svg";

export interface AreaChartData {
  [key: string]: string | number;
}

export interface AreaChartProps {
  // Data
  data: AreaChartData[];
  dataKey: string; // Key for X-axis (e.g., "date", "label")
  valueKey: string; // Key for Y-axis values (e.g., "value", "volume")

  // Styling
  height?: number;
  width?: string | number;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  dotColor?: string;
  dotRadius?: number;
  showDots?: boolean;
  showGrid?: boolean;
  gridColor?: string;
  gridStrokeDasharray?: string;
  showVerticalGrid?: boolean;
  showXAxisLine?: boolean;
  showYAxisLine?: boolean;

  // Axis customization
  showXAxis?: boolean;
  showYAxis?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  xAxisTickFormatter?: (value: any, index: number) => string;
  yAxisTickFormatter?: (value: any, index: number) => string;
  yAxisDomain?: [number | string, number | string];
  yAxisInterval?: number;
  yAxisTickCount?: number;

  // Tooltip
  showTooltip?: boolean;
  tooltipLabelFormatter?: (value: any) => string;
  tooltipValueFormatter?: (value: any, name: string) => [string, string];
  tooltipLabel?: string;
  tooltipValuePrefix?: string;
  tooltipValueSuffix?: string;

  // Area fill
  fillOpacity?: number;
  gradientId?: string;
  gradientStartColor?: string;
  gradientEndColor?: string;
  gradientStartOpacity?: number;
  gradientEndOpacity?: number;

  // Spacing
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };

  // Additional customization
  curveType?:
    | "monotone"
    | "linear"
    | "natural"
    | "step"
    | "stepBefore"
    | "stepAfter";
  connectNulls?: boolean;
  isAnimationActive?: boolean;
  animationDuration?: number;

  // Container styling
  containerSx?: any;
  chartSx?: any;

  // Fixed width and scroll
  fixedWidth?: number;
  enableHorizontalScroll?: boolean;

  // Grid cell dimensions (for fixed grid sizing)
  gridCellWidth?: number; // Width of each grid cell (horizontal spacing between data points)
  gridCellHeight?: number; // Height of each grid cell (vertical spacing between Y-axis ticks)
  gridCellWidthMobile?: number; // Mobile grid cell width (default: 70)
  gridCellHeightMobile?: number; // Mobile grid cell height (default: 70)
  gridCellWidthDesktop?: number; // Desktop grid cell width (default: 150)
  gridCellHeightDesktop?: number; // Desktop grid cell height (default: 75)
}

const CustomTooltip = ({
  active,
  payload,
  labelFormatter,
  valueFormatter,
  label,
  valuePrefix = "",
  valueSuffix = "",
  isMobile,
}: any) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const labelText = labelFormatter
      ? labelFormatter(data)
      : payload[0].payload[payload[0].dataKey];
    const value = payload[0].value;
    const formattedValue = valueFormatter
      ? valueFormatter(value, payload[0].name)
      : [`${valuePrefix}${value}${valueSuffix}`, label || "Value"];

    return (
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          padding: isMobile ? "8px" : "12px",
          border: `1px solid ${theme.palette.border.main}`,
          borderRadius: "14px",
          position: "relative",
          boxShadow: "0 4px 6.3px 0 rgba(52, 93, 157, 0.09)",
          zIndex: 50,

          "&::before": {
            content: '""',
            position: "absolute",
            left: "50%",
            top: "-7px",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderBottom: `7px solid ${theme.palette.border.main}`,
            zIndex: -1,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            left: "50%",
            top: "-5px",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderBottom: "7px solid #fff",
            zIndex: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "4px" : "5px",
          }}
        >
          <Image
            src={CalendarTodayIcon}
            alt="calendar-icon"
            width={isMobile ? 11 : 14}
            height={isMobile ? 11 : 14}
          />
          <Typography
            sx={{
              fontSize: isMobile ? "10px" : "12px",
              fontFamily: "UrbanistMedium",
              color: theme.palette.text.secondary,
              lineHeight: 1.2,
            }}
          >
            {labelText}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "4px" : "5px",
            paddingTop: isMobile ? "8px" : "10px",
          }}
        >
          <Image
            src={RoundedStackIcon}
            alt="Rounded Stack Icon"
            width={isMobile ? 10 : 12}
            height={isMobile ? 10 : 12}
            style={{
              color: theme.palette.primary.main,
              filter:
                "invert(9%) sepia(100%) saturate(6955%) hue-rotate(246deg) brightness(96%) contrast(142%)",
            }}
          />
          <Typography
            sx={{
              fontSize: isMobile ? "10px" : "12px",
              fontFamily: "UrbanistMedium",
              color: theme.palette.primary.main,
              lineHeight: 1.2,
            }}
          >
            {typeof formattedValue === "string"
              ? formattedValue
              : `${formattedValue[1]}: ${formattedValue[0]}`}
          </Typography>
        </Box>
      </Box>
    );
  }

  return null;
};

const CustomDot = ({ cx = 20, cy = 20, fill, r = 5 }: any) => {
  // Use a static filter ID since all dots can share the same filter

  return (
    <g>
      {/* Blurred background circle */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        strokeWidth={1}
        stroke={fill}
        filter={`blur(12px)`}
        opacity={0.6}
      />
      {/* Sharp foreground circle */}
      <circle cx={cx} cy={cy} r={r} strokeWidth={1} fill={fill} />
    </g>
  );
};

const ReusableAreaChart: React.FC<AreaChartProps> = ({
  data,
  dataKey,
  valueKey,
  height = 200,
  width = "100%",
  strokeColor,
  fillColor,
  strokeWidth = 2.5,
  dotColor,
  dotRadius = 0,
  showDots = true,
  showGrid = true,
  gridColor = "#E9ECF2",
  gridStrokeDasharray = "3 3",
  showVerticalGrid = true,
  showXAxisLine = true,
  showYAxisLine = true,
  showXAxis = true,
  showYAxis = true,
  xAxisLabel,
  yAxisLabel,
  xAxisTickFormatter,
  yAxisTickFormatter,
  yAxisDomain,
  yAxisInterval,
  yAxisTickCount,
  showTooltip = true,
  tooltipLabelFormatter,
  tooltipValueFormatter,
  tooltipLabel,
  tooltipValuePrefix = "",
  tooltipValueSuffix = "",
  fillOpacity = 0.2,
  gradientId = "areaGradient",
  gradientStartColor,
  gradientEndColor,
  gradientStartOpacity = 0.2,
  gradientEndOpacity = 0.05,
  margin = { top: 5, right: 0, bottom: 5, left: 0 },
  curveType = "monotone",
  connectNulls = false,
  isAnimationActive = true,
  animationDuration = 500,
  containerSx,
  chartSx,
  fixedWidth,
  enableHorizontalScroll = false,
  gridCellWidth,
  gridCellHeight,
  gridCellWidthMobile = 70,
  gridCellHeightMobile = 70,
  gridCellWidthDesktop = 150,
  gridCellHeightDesktop = 75,
}) => {
  const theme = useTheme();
  const isMobile = useIsMobile("md");

  // Drag scroll refs and state
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  // Use theme colors if not provided
  const finalStrokeColor = strokeColor || theme.palette.primary.main;
  const finalFillColor = fillColor || theme.palette.primary.main;
  const finalDotColor = dotColor || theme.palette.primary.main;
  const finalGradientStartColor =
    gradientStartColor || theme.palette.primary.main;
  const finalGradientEndColor = gradientEndColor || theme.palette.primary.main;

  // Calculate Y-axis domain if not provided
  const calculatedYAxisDomain = useMemo(() => {
    if (yAxisDomain) {
      // If domain is provided, ensure it accommodates all data points
      const values = data
        .map((item) => Number(item[valueKey]))
        .filter((v) => !isNaN(v));
      if (values.length === 0) return yAxisDomain;

      const maxValue = Math.max(...values);
      const [minDomain, maxDomain] = yAxisDomain;
      // If max value exceeds domain, round up to nearest 4000 for equal intervals
      if (maxValue > Number(maxDomain)) {
        const roundedMax = Math.ceil((maxValue + 1000) / 4000) * 4000;
        return [Number(minDomain), roundedMax];
      }
      // Round the max domain to nearest 4000 for equal intervals
      const roundedMax = Math.ceil(Number(maxDomain) / 4000) * 4000;
      return [Number(minDomain), roundedMax];
    }

    const values = data
      .map((item) => Number(item[valueKey]))
      .filter((v) => !isNaN(v));
    if (values.length === 0) return [0, 100];

    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1; // 10% padding

    // Round up to nearest 4000 for equal intervals (0k, 4k, 8k, 12k, 16k, 20k)
    const roundedMax = Math.ceil((max + padding) / 4000) * 4000;
    return [0, roundedMax];
  }, [data, valueKey, yAxisDomain]);

  // Calculate chart dimensions based on grid cell size
  const calculatedChartDimensions = useMemo(() => {
    // Check if any grid cell props are provided
    const hasGridCellProps =
      gridCellWidth ||
      gridCellHeight ||
      gridCellWidthMobile ||
      gridCellHeightMobile ||
      gridCellWidthDesktop ||
      gridCellHeightDesktop;

    if (hasGridCellProps) {
      const dataPoints = data.length;

      // Adjust cell width based on data points count
      // If data points > 10, reduce cell width to make chart more compact
      let baseCellWidth =
        gridCellWidth ||
        (isMobile ? gridCellWidthMobile : gridCellWidthDesktop);
      let baseCellHeight =
        gridCellHeight ||
        (isMobile ? gridCellHeightMobile : gridCellHeightDesktop);

      if (dataPoints > 10) {
        // Reduce cell width proportionally for mobile and desktop
        if (isMobile) {
          // Mobile: reduce more aggressively
          baseCellWidth = baseCellWidth * (10 / dataPoints) * 0.8; // Scale down more
        } else {
          // Desktop: reduce less aggressively
          baseCellWidth = baseCellWidth * (10 / dataPoints) * 0.9; // Scale down less
        }
      }

      const cellWidth = baseCellWidth;
      const cellHeight = baseCellHeight;

        // Calculate width: (number of data points - 1) * cell width + margins
        const calculatedWidth =
          (dataPoints - 1) * cellWidth +
          (margin?.left || 0) +
          (margin?.right || 0) +
          20; // Minimal padding for Y-axis labels

        // Calculate height: number of Y-axis intervals * cell height + margins
        const [minDomain, maxDomain] = calculatedYAxisDomain;
        const minNum =
          typeof minDomain === "string"
            ? parseFloat(minDomain)
            : Number(minDomain);
        const maxNum =
          typeof maxDomain === "string"
            ? parseFloat(maxDomain)
            : Number(maxDomain);
        const yIntervals = 4; // Based on our tick count
        const calculatedHeight =
          yIntervals * cellHeight +
          (margin?.top || 0) +
          (margin?.bottom || 0) +
          10; // Minimal padding

      return { width: calculatedWidth, height: calculatedHeight };
    }
    return null;
  }, [
    gridCellWidth,
    gridCellHeight,
    gridCellWidthMobile,
    gridCellHeightMobile,
    gridCellWidthDesktop,
    gridCellHeightDesktop,
    isMobile,
    data.length,
    calculatedYAxisDomain,
    margin,
  ]);

  const chartWidth =
    fixedWidth ||
    calculatedChartDimensions?.width ||
    (enableHorizontalScroll ? 800 : undefined);
  const chartHeight = calculatedChartDimensions?.height || height;

  // Enable scroll if: explicitly enabled OR chart width is calculated (grid cells provided)
  // This ensures scroll works on all screen sizes when grid dimensions are set
  const shouldScroll =
    enableHorizontalScroll || calculatedChartDimensions?.width !== undefined;

  // Drag scroll handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!scrollContainerRef.current || !shouldScroll) return;
      // Don't start drag if clicking on interactive elements
      if (
        (e.target as HTMLElement).closest("button") ||
        (e.target as HTMLElement).closest("a") ||
        (e.target as HTMLElement).closest(".recharts-tooltip-wrapper")
      )
        return;
      e.preventDefault();
      e.stopPropagation();
      isDraggingRef.current = true;
      setIsDragging(true);
      startXRef.current =
        e.pageX - (scrollContainerRef.current.offsetLeft || 0);
      scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    },
    [shouldScroll]
  );

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startXRef.current) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  }, []);

  const handleMouseUp = useCallback((e?: React.MouseEvent<HTMLDivElement>) => {
    if (e) {
      e.stopPropagation();
    }
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(
    (e?: React.MouseEvent<HTMLDivElement>) => {
      if (e) {
        e.stopPropagation();
      }
      isDraggingRef.current = false;
      setIsDragging(false);
    },
    []
  );

  return (
    <Box
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      sx={{
        width: shouldScroll ? "100%" : width,
        height: chartHeight,
        position: "relative",
        overflowX: shouldScroll ? "auto" : "visible",
        overflowY: "hidden",
        outline: "none",
        border: "none",
        cursor: shouldScroll ? (isDragging ? "grabbing" : "grab") : "pointer",
        userSelect: shouldScroll ? "none" : "auto",
        WebkitUserSelect: shouldScroll ? "none" : "auto",
        MozUserSelect: shouldScroll ? "none" : "auto",
        msUserSelect: shouldScroll ? "none" : "auto",
        willChange: shouldScroll && isDragging ? "scroll-position" : "auto",
        "&:focus": {
          outline: "none",
          border: "none",
        },
        "&:focus-visible": {
          outline: "none",
          border: "none",
        },
        "& *": {
          outline: "none !important",
          userSelect: shouldScroll ? "none" : "auto",
          WebkitUserDrag: shouldScroll ? "none" : "auto",
          "&:focus": {
            outline: "none !important",
            border: "none !important",
          },
          "&:focus-visible": {
            outline: "none !important",
            border: "none !important",
          },
        },
        "&::-webkit-scrollbar": {
          height: "0px",
        },
        "&::-webkit-scrollbar-track": {
          display: "none",
        },
        "&::-webkit-scrollbar-thumb": {
          display: "none",
        },
        // For Firefox
        scrollbarWidth: "none",
        ...containerSx,
      }}
    >
      <Box
        sx={{
          width: shouldScroll ? chartWidth : "100%",
          height: chartHeight || "100%",
          minWidth: shouldScroll ? chartWidth : "auto",
          outline: "none",
          "&:focus": {
            outline: "none",
            border: "none",
          },
          "&:focus-visible": {
            outline: "none",
            border: "none",
          },
        }}
      >
        <ResponsiveContainer
          width={calculatedChartDimensions?.width ? chartWidth : "100%"}
          height={calculatedChartDimensions?.height ? chartHeight : "100%"}
        >
          <AreaChart
            data={data}
            margin={margin}
            style={{
              outline: "none",
              border: "none",
              cursor: isDragging ? "grabbing" : "grab",
              ...chartSx,
            }}
            responsive={true}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={finalGradientStartColor}
                  stopOpacity={gradientStartOpacity}
                />
                <stop
                  offset="80%"
                  stopColor={finalGradientEndColor}
                  stopOpacity={gradientEndOpacity}
                />
              </linearGradient>
            </defs>

            {showGrid && (
              <CartesianGrid
                strokeDasharray={gridStrokeDasharray}
                stroke={gridColor}
                vertical={showVerticalGrid}
                horizontal={true}
              />
            )}

            {showXAxis && (
              <XAxis
                dataKey={dataKey}
                tick={{
                  fontSize: isMobile ? 10 : 12,
                  fill: theme.palette.text.secondary,
                  fontFamily: "UrbanistRegular",
                  dy: isMobile ? 3 : 6,
                }}
                tickLine={true}
                axisLine={showXAxisLine}
                tickFormatter={xAxisTickFormatter}
                label={
                  xAxisLabel
                    ? {
                        value: xAxisLabel,
                        position: "insideBottom",
                        offset: -5,
                      }
                    : undefined
                }
                padding={{ left: 0, right: 0 }}
              />
            )}

            {showYAxis && (
              <YAxis
                tick={{
                  fontSize: isMobile ? 10 : 12,
                  fill: theme.palette.text.secondary,
                  fontFamily: "UrbanistRegular",
                  dx: isMobile ? -3 : -6, // Add padding between text and tick line
                }}
                tickLine={true}
                axisLine={showYAxisLine}
                domain={calculatedYAxisDomain}
                tickFormatter={yAxisTickFormatter}
                interval={yAxisInterval}
                tickCount={yAxisTickCount || 5}
                ticks={(() => {
                  const [min, max] = calculatedYAxisDomain;
                  const minNum =
                    typeof min === "string" ? parseFloat(min) : Number(min);
                  const maxNum =
                    typeof max === "string" ? parseFloat(max) : Number(max);
                  const interval = (maxNum - minNum) / 4; // 5 ticks = 4 equal intervals
                  return [
                    minNum,
                    minNum + interval,
                    minNum + interval * 2,
                    minNum + interval * 3,
                    maxNum,
                  ];
                })()}
                label={
                  yAxisLabel
                    ? { value: yAxisLabel, angle: -90, position: "insideLeft" }
                    : undefined
                }
                padding={{ top: 0, bottom: 0 }}
                width={40} // Reduced width to minimize extra space
              />
            )}

            {showTooltip && (
              <Tooltip
                content={
                  <CustomTooltip
                    labelFormatter={tooltipLabelFormatter}
                    valueFormatter={tooltipValueFormatter}
                    label={tooltipLabel}
                    valuePrefix={tooltipValuePrefix}
                    valueSuffix={tooltipValueSuffix}
                    isMobile={isMobile}
                  />
                }
              />
            )}

            <Area
              type={curveType}
              dataKey={valueKey}
              stroke={finalStrokeColor}
              strokeWidth={strokeWidth}
              fill={`url(#${gradientId})`}
              fillOpacity={1}
              connectNulls={connectNulls}
              isAnimationActive={isAnimationActive}
              animationDuration={animationDuration}
              dot={
                showDots ? (
                  <CustomDot fill={finalDotColor} r={dotRadius} />
                ) : (
                  false
                )
              }
              activeDot={{
                r: dotRadius + 3,
                fill: finalDotColor,
                stroke: "none",
                strokeWidth: 0,
              }}
              style={{
                outline: "none",
                border: "none",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default ReusableAreaChart;
