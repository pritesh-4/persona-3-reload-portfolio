import { useState, useEffect, useRef, useCallback, useMemo, type FC } from 'react';
import { MENU_ITEMS } from '../../data/menuConfig';
import { PROJECTS_DATA } from '../../data/projectsData';
import { PRIMARY_CONTACT } from '../../data/socialLinksData';
import { useAudioContext } from '../../hooks/useAudioContext';
import '../../styles/terminal.css';

export interface CommandItem {
  id: string;
  category: 'DESTINATION' | 'MISSION' | 'ACTION';
  label: string;
  sublabel: string;
  badge?: string;
  icon?: string;
  keywords: string[];
  onSelect: () => void;
}

interface CommandTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  onOpenStatusPanel?: () => void;
}

export const CommandTerminal: FC<CommandTerminalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenStatusPanel,
}) => {
  const { playSfx, toggleBgm } = useAudioContext();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Build the complete command catalogue
  const commands: CommandItem[] = useMemo(() => {
    const items: CommandItem[] = [];

    // 1. Destinations (8 Sections)
    MENU_ITEMS.forEach((menuItem, idx) => {
      items.push({
        id: `dest-${menuItem.id}`,
        category: 'DESTINATION',
        label: `${menuItem.label} // ${menuItem.sublabel}`,
        sublabel: menuItem.description,
        badge: `[00${idx + 1}]`,
        icon: menuItem.icon,
        keywords: [
          menuItem.label.toLowerCase(),
          menuItem.sublabel.toLowerCase(),
          menuItem.id.toLowerCase(),
          menuItem.route.toLowerCase(),
          'page',
          'section',
        ],
        onSelect: () => {
          onNavigate(menuItem.route);
        },
      });
    });

    // 2. Missions / Projects (7 Projects)
    PROJECTS_DATA.forEach((mission) => {
      items.push({
        id: `mission-${mission.id}`,
        category: 'MISSION',
        label: `${mission.code} // ${mission.title}`,
        sublabel: `${mission.subtitle} • ${mission.implementationStatus}`,
        badge: mission.difficulty,
        icon: '◈',
        keywords: [
          mission.code.toLowerCase(),
          mission.title.toLowerCase(),
          mission.subtitle.toLowerCase(),
          mission.role.toLowerCase(),
          mission.category.toLowerCase(),
          mission.implementationStatus.toLowerCase(),
          ...mission.techStack.map((t) => t.toLowerCase()),
          'project',
          'dossier',
        ],
        onSelect: () => {
          onNavigate(`/projects?mission=${mission.id}`);
        },
      });
    });

    // 3. Quick Actions, Profiles & External Channels
    items.push({
      id: 'action-recruiter',
      category: 'ACTION',
      label: 'QUICK RECRUITER ACCESS // SUMMARY DOSSIER',
      sublabel: 'Executive professional summary with education, skills, key projects and direct resume download.',
      badge: 'RECOMMENDED',
      icon: '★',
      keywords: ['recruiter', 'recruiting', 'hire', 'quick', 'summary', 'profile', 'resume', 'cv', 'job', 'interview'],
      onSelect: () => {
        onNavigate('/recruiter');
      },
    });

    if (onOpenStatusPanel) {
      items.push({
        id: 'action-status',
        category: 'ACTION',
        label: 'DEVELOPER PERSONNEL STATUS // ACTIVE FOCUS',
        sublabel: 'Inspect currently building, exploring, research pursuits, and verified availability.',
        badge: 'STATUS',
        icon: '◆',
        keywords: ['status', 'availability', 'exploring', 'building', 'current', 'focus'],
        onSelect: () => {
          onOpenStatusPanel();
        },
      });
    }

    items.push({
      id: 'action-resume',
      category: 'ACTION',
      label: 'EQUIP // RESUME & PROGRESSION TIMELINE',
      sublabel: 'Full academic history, verified achievements, and interactive progression loadout.',
      badge: 'RESUME',
      icon: '⚔',
      keywords: ['resume', 'cv', 'education', 'nit rourkela', 'progression', 'experience'],
      onSelect: () => {
        onNavigate('/resume');
      },
    });

    items.push({
      id: 'action-github',
      category: 'ACTION',
      label: 'GITHUB PROFILE // @pritesh-4',
      sublabel: 'External source code repositories, commit activity, and open-source contributions.',
      badge: 'EXTERNAL ↗',
      icon: '↗',
      keywords: ['github', 'code', 'source', 'git', 'pritesh-4', 'repo'],
      onSelect: () => {
        window.open(PRIMARY_CONTACT.githubUrl, '_blank', 'noopener,noreferrer');
      },
    });

    items.push({
      id: 'action-linkedin',
      category: 'ACTION',
      label: 'LINKEDIN // PRITESH JENA',
      sublabel: 'Professional network, career updates, and engineering connections.',
      badge: 'EXTERNAL ↗',
      icon: '↗',
      keywords: ['linkedin', 'connect', 'network', 'career', 'contact'],
      onSelect: () => {
        window.open(PRIMARY_CONTACT.linkedinUrl, '_blank', 'noopener,noreferrer');
      },
    });

    items.push({
      id: 'action-email',
      category: 'ACTION',
      label: `DIRECT EMAIL // ${PRIMARY_CONTACT.email}`,
      sublabel: 'Send direct email correspondence regarding opportunities and technical collaborations.',
      badge: 'MAIL',
      icon: '✉',
      keywords: ['email', 'mail', 'contact', 'message', 'inquiry'],
      onSelect: () => {
        window.location.href = PRIMARY_CONTACT.mailtoUrl;
      },
    });

    items.push({
      id: 'action-music',
      category: 'ACTION',
      label: 'AUDIO // TOGGLE BACKGROUND MUSIC',
      sublabel: 'Play or pause the authentic Persona 3 Reload "Colour Your Night" BGM stream.',
      badge: 'AUDIO',
      icon: '♪',
      keywords: ['music', 'audio', 'sound', 'bgm', 'song', 'volume', 'mute'],
      onSelect: () => {
        toggleBgm();
      },
    });

    return items;
  }, [onNavigate, onOpenStatusPanel, toggleBgm]);

  // Filter commands by query string (case-insensitive substring across label, sublabel, and keywords)
  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((cmd) => {
      if (cmd.label.toLowerCase().includes(q)) return true;
      if (cmd.sublabel.toLowerCase().includes(q)) return true;
      return cmd.keywords.some((kw) => kw.includes(q));
    });
  }, [commands, query]);

  // Focus management & keyboard shortcuts
  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;
      inputRef.current?.focus();
    } else {
      previousActiveElementRef.current?.focus();
    }
  }, [isOpen]);

  const handleExecute = useCallback(
    (item: CommandItem) => {
      playSfx('confirm');
      setQuery('');
      setSelectedIndex(0);
      onClose();
      item.onSelect();
    },
    [playSfx, onClose]
  );

  const handleClose = useCallback(() => {
    playSfx('back');
    setQuery('');
    setSelectedIndex(0);
    onClose();
  }, [playSfx, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>('.p3r-cmd-item.selected');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Keyboard navigation within the terminal
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      playSfx('hover');
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      playSfx('hover');
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        handleExecute(filteredCommands[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="p3r-cmd-terminal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Persona 3 Reload Command Terminal"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="p3r-cmd-terminal-window">
        {/* Terminal Header */}
        <div className="p3r-cmd-head">
          <div className="p3r-cmd-head-left">
            <span className="p3r-cmd-status-led" />
            <span className="p3r-cmd-sys-title">S.E.E.S. GLOBAL COMMAND TERMINAL // v2.6</span>
          </div>
          <div className="p3r-cmd-head-right">
            <span className="p3r-cmd-tag-hint"><kbd>ESC</kbd> CLOSE</span>
            <button
              type="button"
              className="p3r-cmd-close-btn"
              onClick={handleClose}
              aria-label="Close Command Terminal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="p3r-cmd-input-bar">
          <span className="p3r-cmd-prompt-glyph" aria-hidden="true">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            className="p3r-cmd-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, destination, project code, or skill..."
            aria-autocomplete="list"
            aria-controls="p3r-cmd-results-list"
            aria-activedescendant={
              filteredCommands[selectedIndex] ? `cmd-item-${filteredCommands[selectedIndex].id}` : undefined
            }
          />
          {query && (
            <button
              type="button"
              className="p3r-cmd-clear-btn"
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
              }}
              aria-label="Clear query"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          id="p3r-cmd-results-list"
          className="p3r-cmd-results-list"
          role="listbox"
          aria-label="Command Suggestions"
        >
          {filteredCommands.length === 0 ? (
            <div className="p3r-cmd-empty-state">
              <span className="p3r-cmd-empty-glyph">◈</span>
              <p className="p3r-cmd-empty-text">
                NO COMMAND IDENTIFIED FOR &ldquo;{query}&rdquo;
              </p>
              <span className="p3r-cmd-empty-sub">
                Try searching for &ldquo;salvus&rdquo;, &ldquo;recruiter&rdquo;, &ldquo;resume&rdquo;, &ldquo;stats&rdquo;, or &ldquo;skills&rdquo;.
              </span>
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  id={`cmd-item-${item.id}`}
                  role="option"
                  aria-selected={isSelected}
                  className={`p3r-cmd-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleExecute(item)}
                  onMouseEnter={() => {
                    if (selectedIndex !== idx) {
                      playSfx('hover');
                      setSelectedIndex(idx);
                    }
                  }}
                >
                  <div className="p3r-cmd-item-left">
                    <span className="p3r-cmd-item-icon" aria-hidden="true">{item.icon || '◈'}</span>
                    <div className="p3r-cmd-item-text">
                      <div className="p3r-cmd-item-label-row">
                        <span className="p3r-cmd-item-label">{item.label}</span>
                        {item.badge && (
                          <span className={`p3r-cmd-item-badge badge-${item.category.toLowerCase()}`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="p3r-cmd-item-sublabel">{item.sublabel}</span>
                    </div>
                  </div>

                  <div className="p3r-cmd-item-right">
                    <span className="p3r-cmd-cat-tag">{item.category}</span>
                    <span className="p3r-cmd-enter-hint" aria-hidden="true">↵</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Terminal Footer Bar */}
        <div className="p3r-cmd-footer">
          <div className="p3r-cmd-footer-hints">
            <span className="p3r-cmd-fhint"><kbd>&uarr;&darr;</kbd> NAVIGATE</span>
            <span className="p3r-cmd-fhint"><kbd>ENTER</kbd> EXECUTE</span>
            <span className="p3r-cmd-fhint"><kbd>ESC</kbd> CLOSE</span>
            <span className="p3r-cmd-fhint"><kbd>M</kbd> TOGGLE BGM</span>
          </div>
          <div className="p3r-cmd-footer-count">
            {filteredCommands.length} AVAILABLE TARGETS
          </div>
        </div>
      </div>
    </div>
  );
};
