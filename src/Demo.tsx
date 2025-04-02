import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

interface RenderTree {
  id: string;
  name: string;
  children?: RenderTree[];
}

// 🔹 Generate Large Dataset (5,000+ Nodes)
const generateTreeData = (
  depth = 3,
  breadth = 5,
  prefix = "node"
): RenderTree => {
  const createNode = (level: number, index: number): RenderTree => ({
    id: `${prefix}-${level}-${index}`,
    name: `Node ${level}-${index}`,
    children:
      level > 0
        ? Array.from({ length: breadth }, (_, i) => createNode(level - 1, i))
        : undefined,
  });

  return createNode(depth, 0);
};

const data = generateTreeData(4, 5); // Generates ~5,000+ nodes

export default function VirtualizedTreeView() {
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const renderTree = (node: RenderTree) => (
    <TreeItem key={node.id} nodeId={node.id} label={node.name}>
      {node.children ? node.children.map((child) => renderTree(child)) : null}
    </TreeItem>
  );

  return (
    <TreeView
      aria-label="virtualized tree"
      expanded={expanded}
      onNodeToggle={handleToggle}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ minHeight: 110, flexGrow: 1, maxWidth: 500 }}
    >
      {renderTree(data)}
    </TreeView>
  );
}
