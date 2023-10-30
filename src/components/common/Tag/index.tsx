import "./style.scss";
import { Space, Tag as TagAntd } from "antd";
export interface ITagProps {
  label?: string;
  required?: boolean;
  minimizedLabel?: boolean;
  description?: string;
  error?: string;
  wrapperStyle?: React.CSSProperties;
  color?: string;
  children?: JSX.Element | JSX.Element[];
}
export default function Tag({ children, color, ...rest }: ITagProps) {
  return (
    <>
      <TagAntd {...rest} className="pni-tag" color={color || "primary-color"}>
        {children}
      </TagAntd>
    </>
  );
}
