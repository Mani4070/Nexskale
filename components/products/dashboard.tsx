import {
  Layers,
  LayoutDashboard,
  BarChart3,
  MessageSquare,
  Users,
  Settings,
  Search,
  Activity,
} from "lucide-react";
import type { Content } from "@/lib/content";
export default function Dashboard({
  project,
}: {
  project: Content["projects"][number];
}) {
  return (
    <div className={`project-visual ${project.theme}`}>
      <div className="dashboard">
        <aside>
          <span className="dash-brand">
            <Layers size={11} />
            {project.product}
          </span>
          {[LayoutDashboard, BarChart3, MessageSquare, Users, Settings].map(
            (Icon, i) => (
              <span className={`dash-nav ${i === 0 ? "selected" : ""}`} key={i}>
                <Icon size={9} />
                <i>
                  {
                    [
                      "Overview",
                      "Analytics",
                      "Messages",
                      "Customers",
                      "Settings",
                    ][i]
                  }
                </i>
              </span>
            ),
          )}
          <span className="dash-profile">
            <span /> Your workspace
          </span>
        </aside>
        <div className="dash-main">
          <div className="dash-top">
            Workspace overview
            <Search size={9} />
          </div>
          <div className="dash-greeting">
            {project.theme === "light"
              ? "Let’s make today a good day."
              : "Your performance, at a glance."}
            <span>Here’s what’s happening with your business today.</span>
          </div>
          <div className="dash-metrics">
            {["Total revenue", "Active users", "Growth"].map((x, i) => (
              <div key={x}>
                <span>{x}</span>
                <b>{["$24,850", "2,420", "+18.6%"][i]}</b>
                <small>↗ {i + 8}.2%</small>
              </div>
            ))}
          </div>
          <div className="dash-chart">
            <div>
              Activity overview <span>This week ↗</span>
            </div>
            <div className="bars">
              {[
                30, 47, 40, 65, 50, 72, 58, 85, 65, 79, 72, 96, 78, 90, 83, 100,
              ].map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="dash-bottom">
            <span>Recent activity</span>
            <span>View all →</span>
          </div>
          {[0, 1, 2].map((i) => (
            <div className="dash-row" key={i}>
              <i />
              <span />
              <b />
              <em>Completed</em>
            </div>
          ))}
        </div>
      </div>
      {project.theme === "blue" && (
        <div className="phone-preview">
          <span className="phone-notch" />
          <Activity size={17} />
          <small>YOUR DAILY ACTIVITY</small>
          <strong>
            Make every
            <br />
            move count.
          </strong>
          <div className="activity-ring">
            76<small>of 100 points</small>
          </div>
          <div className="phone-stats">
            <span>
              6,240<small>Steps</small>
            </span>
            <span>
              320<small>Calories</small>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
