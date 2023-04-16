import { styled } from "@mui/material/styles";
import { Tooltip, tooltipClasses } from "@mui/material";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 15,
    fontWeight: "bolder",
  },
}));

export const ToolTip = ({ title, placement, children }) => {
  return (
    <LightTooltip title={title} describeChild placement={placement}>
      {children}
    </LightTooltip>
  );
};
