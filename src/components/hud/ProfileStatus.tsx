import { type FC } from 'react';
import '../../styles/hud.css';

interface ProfileStatusProps {
  portraitPath?: string;
  name?: string;
  level?: number;
  role?: string;
}

export const ProfileStatus: FC<ProfileStatusProps> = ({
  portraitPath = '/assets/persona3/characters/thumbnails/makoto-yuki-thumb.webp',
  name = 'PRITESH JENA',
  level = 99,
  role = 'FULL-STACK // AI/ML',
}) => {
  return (
    <aside className="p3r-hud-profile" aria-label="Developer Status">
      <div className="p3r-hud-profile-content">
        <div className="p3r-profile-avatar-wrap">
          <img
            src={portraitPath}
            alt="Profile Avatar"
            className="p3r-profile-avatar"
            loading="lazy"
          />
        </div>

        <div className="p3r-profile-info">
          <div className="p3r-profile-topline">
            <span className="p3r-profile-name">{name}</span>
            <span className="p3r-profile-level">LV.{level}</span>
          </div>
          <span className="p3r-profile-sub">{role}</span>

          <div className="p3r-profile-bars">
            <div className="p3r-bar-row">
              <span className="p3r-bar-label dev">DEV</span>
              <div className="p3r-meter-track">
                <div className="p3r-meter-fill dev" />
              </div>
            </div>
            <div className="p3r-bar-row">
              <span className="p3r-bar-label exp">EXP</span>
              <div className="p3r-meter-track">
                <div className="p3r-meter-fill exp" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

