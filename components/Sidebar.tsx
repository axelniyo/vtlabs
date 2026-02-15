
import React from 'react';

const Sidebar: React.FC = () => {
  const sidebarItems = ['Our Services', 'Partners', 'Mission', 'Vision'];

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="bg-vt-surface p-6 rounded-lg shadow-md sticky top-28">
        <h3 className="text-xl font-bold text-vt-text-light mb-4">Explore</h3>
        <ul className="space-y-3">
          {sidebarItems.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-vt-text-secondary hover:text-vt-pink font-medium transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
