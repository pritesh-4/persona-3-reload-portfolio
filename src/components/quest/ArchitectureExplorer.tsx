import { useState, type FC, type KeyboardEvent } from 'react';
import {
  type ArchitectureDiagram,
  type ArchitectureNode,
} from '../../data/projectsData';
import { useAudioContext } from '../../hooks/useAudioContext';

/**
 * Interactive system-diagram inspector for QUEST dossiers.
 * Diagram geometry is pure data (1000 x 520 canvas) sourced from
 * projectsData.ts — the component renders whatever specification exists,
 * distinguishing IMPLEMENTED components from PLANNED target-spec blocks.
 */

const NODE_W = 170;
const NODE_H = 64;

interface ArchitectureExplorerProps {
  diagram: ArchitectureDiagram;
  /** Shown in the aria-label so screen readers know which system this is. */
  systemName: string;
}

/** Line endpoints clipped to the two node rectangles, with a small gap. */
function edgePoints(a: ArchitectureNode, b: ArchitectureNode) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;

  // Distance from a node's center to its rectangle border along the edge ray
  const borderT = () => {
    const tx = NODE_W / 2 / Math.abs(ux);
    const ty = NODE_H / 2 / Math.abs(uy);
    return Math.min(tx, ty) + 5;
  };

  const t0 = borderT();
  const t1 = borderT();
  return {
    x1: a.x + ux * t0,
    y1: a.y + uy * t0,
    x2: b.x - ux * t1,
    y2: b.y - uy * t1,
  };
}

export const ArchitectureExplorer: FC<ArchitectureExplorerProps> = ({ diagram, systemName }) => {
  const { playSfx } = useAudioContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const nodeMap = new Map(diagram.nodes.map(n => [n.id, n]));
  const selected = selectedId ? nodeMap.get(selectedId) ?? null : null;

  const incoming = diagram.edges.filter(e => e.to === selectedId);
  const outgoing = diagram.edges.filter(e => e.from === selectedId);

  const handleActivate = (id: string, silent = false) => {
    if (!silent) playSfx('select');
    setSelectedId(current => (current === id ? current : id));
  };

  const handleNodeKeyDown = (e: KeyboardEvent<SVGGElement>, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleActivate(id);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = diagram.nodes.findIndex(n => n.id === id);
      const next = diagram.nodes[(idx + 1) % diagram.nodes.length];
      document.getElementById(`p3r-arch-node-${next.id}`)?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = diagram.nodes.findIndex(n => n.id === id);
      const prev = diagram.nodes[(idx - 1 + diagram.nodes.length) % diagram.nodes.length];
      document.getElementById(`p3r-arch-node-${prev.id}`)?.focus();
    }
  };

  return (
    <div className="p3r-arch-explorer">
      <div className="p3r-arch-heading-row">
        <h4 className="p3r-dossier-heading">SYSTEM ARCHITECTURE // {diagram.title}</h4>
        <div className="p3r-arch-legend" aria-hidden="true">
          <span className="p3r-arch-legend-item legend-implemented">IMPLEMENTED</span>
          <span className="p3r-arch-legend-item legend-planned">PLANNED / TARGET SPEC</span>
        </div>
      </div>

      {/* Horizontal scroll wrapper keeps the 1000x520 diagram readable on phones */}
      <div className="p3r-arch-scroll" role="group" aria-label={`${systemName} system diagram — inspectable components`}>
        <svg
          className="p3r-arch-svg"
          viewBox="0 0 1000 520"
          role="presentation"
          focusable="false"
        >
          <defs>
            <marker
              id="p3r-arch-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" className="p3r-arch-arrow-head" />
            </marker>
            <marker
              id="p3r-arch-arrow-planned"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" className="p3r-arch-arrow-head-planned" />
            </marker>
          </defs>

          {/* Edges below nodes */}
          {diagram.edges.map((edge, idx) => {
            const from = nodeMap.get(edge.from);
            const to = nodeMap.get(edge.to);
            if (!from || !to) return null;
            const { x1, y1, x2, y2 } = edgePoints(from, to);
            const active = selectedId === edge.from || selectedId === edge.to;
            return (
              <line
                key={idx}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className={[
                  'p3r-arch-edge',
                  edge.dashed ? 'edge-planned' : 'edge-implemented',
                  active ? 'edge-active' : '',
                ].join(' ')}
                markerEnd={edge.dashed ? 'url(#p3r-arch-arrow-planned)' : 'url(#p3r-arch-arrow)'}
              />
            );
          })}

          {/* Nodes above edges */}
          {diagram.nodes.map(node => {
            const isSelected = node.id === selectedId;
            return (
              <g
                key={node.id}
                id={`p3r-arch-node-${node.id}`}
                className={`p3r-arch-node ${node.status === 'PLANNED' ? 'node-planned' : 'node-implemented'} ${isSelected ? 'node-selected' : ''}`}
                transform={`translate(${node.x}, ${node.y})`}
                tabIndex={0}
                role="button"
                aria-label={`${node.label} — ${node.status === 'PLANNED' ? 'planned component' : 'implemented component'}. Press Enter to inspect.`}
                aria-pressed={isSelected}
                onClick={() => handleActivate(node.id)}
                onFocus={() => {
                  // Keyboard focus previews the component, mirroring mission cards
                  if (!isSelected) handleActivate(node.id, true);
                }}
                onMouseEnter={() => {
                  if (!isSelected) playSfx('hover');
                }}
                onKeyDown={e => handleNodeKeyDown(e, node.id)}
              >
                <rect
                  x={-NODE_W / 2}
                  y={-NODE_H / 2}
                  width={NODE_W}
                  height={NODE_H}
                  rx={2}
                />
                <text className="p3r-arch-node-label" y={-4} textAnchor="middle">
                  {node.label}
                </text>
                <text
                  className={`p3r-arch-node-status ${node.status === 'PLANNED' ? 'status-planned' : 'status-implemented'}`}
                  y={16}
                  textAnchor="middle"
                >
                  {node.status === 'PLANNED' ? '◈ PLANNED' : '◆ IMPLEMENTED'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Component Inspection Panel */}
      <div className="p3r-arch-detail" aria-live="polite">
        {!selected ? (
          <p className="p3r-arch-detail-empty">
            SELECT A COMPONENT IN THE DIAGRAM TO INSPECT ITS ENGINEERING SPECIFICATION.
          </p>
        ) : (
          <>
            <div className="p3r-arch-detail-head">
              <span className="p3r-arch-detail-name">{selected.label}</span>
              <span
                className={`p3r-arch-detail-status ${selected.status === 'PLANNED' ? 'status-planned' : 'status-implemented'}`}
              >
                {selected.status}
              </span>
            </div>

            <p className="p3r-arch-detail-purpose">{selected.purpose}</p>

            <div className="p3r-arch-detail-grid">
              <div className="p3r-arch-detail-io">
                <span className="p3r-arch-detail-subhead">INPUTS</span>
                <ul>
                  {selected.inputs.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="p3r-arch-detail-io">
                <span className="p3r-arch-detail-subhead">OUTPUTS</span>
                <ul>
                  {selected.outputs.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p3r-arch-detail-row">
              <span className="p3r-arch-detail-subhead">DATA FLOW</span>
              <p>{selected.flow}</p>
            </div>

            <div className="p3r-arch-detail-row">
              <span className="p3r-arch-detail-subhead">TECHNOLOGIES</span>
              <div className="p3r-mission-tags-row">
                {selected.tech.map((t, idx) => (
                  <span key={idx} className="p3r-mission-tag">{t}</span>
                ))}
              </div>
            </div>

            {(incoming.length > 0 || outgoing.length > 0) && (
              <div className="p3r-arch-detail-row">
                <span className="p3r-arch-detail-subhead">CONNECTIONS</span>
                <div className="p3r-arch-connections">
                  {incoming.map((edge, idx) => {
                    const from = nodeMap.get(edge.from);
                    return from ? (
                      <button
                        key={`in-${idx}`}
                        type="button"
                        className="p3r-arch-connection-chip connection-in"
                        onClick={() => handleActivate(edge.from)}
                      >
                        ◀ {from.label}
                      </button>
                    ) : null;
                  })}
                  {outgoing.map((edge, idx) => {
                    const to = nodeMap.get(edge.to);
                    return to ? (
                      <button
                        key={`out-${idx}`}
                        type="button"
                        className="p3r-arch-connection-chip connection-out"
                        onClick={() => handleActivate(edge.to)}
                      >
                        {to.label} ▶
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
