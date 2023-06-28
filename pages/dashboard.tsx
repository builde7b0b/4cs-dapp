import React, { ReactText } from 'react';


interface DashboardLayoutProps {
    balanceContent: React.ReactNode;
    balancez: number | null;
  }

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ balanceContent, balancez }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold">4Cs User Dashboard</div>
          {/* Navigation */}
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">Profile</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">Settings</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Widget 1 */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">$CRO Balance</h2>
            <p className="text-xl font-bold">{balancez}</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">$cGOLD Balance</h2>
            <p className="text-xl font-bold">1,234.56</p>
          </div>
          {/* Widget 2 */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">Rewards Accrued</h2>
            <ul className="space-y-2">
              <li>
                <p>Bank Heist</p>
              </li>
              <li>
                <p>Parole Program</p>
              </li>
              {/* More transactions */}
            </ul>
          </div>
          {/* Widget 3 */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-bold mb-2">Eligilibity</h2>
            <ul className="space-y-2">
              <li>
                <p>Cro Crooks Owned:{balanceContent}</p>
              </li>
              <li>
                <p>CroBo Cop NFTs Owned:</p>
              </li>
              {/* More notifications */}
            </ul>
          </div>
        </div>
      </main>
      <footer className="bg-gray-200 text-center py-4">
        <p className="text-sm text-gray-600">&copy; 2023 My App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
