import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#121212]/80 backdrop-blur-lg border-b border-gray-800/20 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src="https://i.pinimg.com/originals/3a/23/e6/3a23e6008d880405a27aa59b7072b097.jpg"
                  alt="Logo"
                  className="h-10 w-10 rounded-full ring-2 ring-orange-500/20"
                />
                <span className="text-xl font-bold text-white">
                  Ihuzo Smart HR Tool
                </span>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="#features"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Features
                </Link>
                <Link
                  to="#pricing"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Pricing
                </Link>
                <Link
                  to="#about"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  About
                </Link>
                <Link
                  to="#contact"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl text-white bg-orange-500 hover:bg-orange-600 
                   transition-all duration-300 transform hover:-translate-y-0.5
                   hover:shadow-lg hover:shadow-orange-500/25"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Animation */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16"
        >
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-blue-400 bg-clip-text text-transparent">
              Transform Your HR Management
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Streamline your HR processes, improve employee experience, and
              make data-driven decisions with our comprehensive HR management
              solution.
            </p>
            {/* ... buttons ... */}
          </div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-12 relative"
          >
            <div className="bg-[#121212] rounded-2xl p-4 border border-gray-800/20 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=2002&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your actual dashboard preview
                alt="Dashboard Preview"
                className="rounded-lg w-full object-cover h-[400px]"
              />
              <div className="absolute -top-4 -left-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm">
                Live Preview
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Core HR Features Section */}
      <section className="py-20 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Comprehensive HR Management
            </h2>
            <p className="text-gray-400">
              Everything you need to manage your workforce effectively
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "👤",
                title: "Employee Profiles",
                description:
                  "Maintain detailed employee records with customizable fields and document management.",
              },
              {
                icon: "📊",
                title: "Performance Tracking",
                description:
                  "Set and track KPIs, conduct reviews, and manage employee goals.",
              },
              {
                icon: "📅",
                title: "Leave Management",
                description:
                  "Streamline leave requests, approvals, and balance tracking.",
              },
              {
                icon: "💰",
                title: "Payroll Integration",
                description:
                  "Seamless integration with popular payroll systems and tax compliance.",
              },
              {
                icon: "📈",
                title: "Analytics & Reports",
                description:
                  "Generate insights with customizable reports and dashboards.",
              },
              {
                icon: "🎯",
                title: "Goal Tracking",
                description:
                  "Set and monitor organizational and individual goals.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800/20 hover:border-orange-500/20
                         transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-gradient-to-b from-[#121212] to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Streamlined HR Workflows
            </h2>
            <p className="text-gray-400">
              Automate your HR processes and save time
            </p>
          </motion.div>

          {/* Add Timeline/Process Steps */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 to-blue-500 rounded-full" />

            {/* Timeline items */}
            {[
              {
                title: "Onboarding",
                description:
                  "Streamlined employee onboarding process with automated workflows and checklists.",
              },
              {
                title: "Time & Attendance",
                description:
                  "Accurate time tracking with multiple options for clock-in/out.",
              },
              {
                title: "Performance Reviews",
                description:
                  "Structured review cycles with customizable assessment criteria.",
              },
              {
                title: "Offboarding",
                description:
                  "Systematic process for employee exits and documentation.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center mb-12 ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                }`}
              >
                <div className="w-1/2 px-12">
                  <div
                    className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800/20
                               hover:border-orange-500/20 transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-orange-500 rounded-full z-10" />
                <div className="w-1/2 px-12" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-[#121212]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Seamless Integrations</h2>
            <p className="text-gray-400">
              Connect with your favorite tools and platforms
            </p>
          </motion.div>

          {/* Integration Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Slack", logo: "path-to-slack-logo.png" },
              { name: "Microsoft Teams", logo: "path-to-teams-logo.png" },
              { name: "Google Workspace", logo: "path-to-google-logo.png" },
              { name: "Zoom", logo: "path-to-zoom-logo.png" },
              { name: "Jira", logo: "path-to-jira-logo.png" },
              { name: "Salesforce", logo: "path-to-salesforce-logo.png" },
              { name: "QuickBooks", logo: "path-to-quickbooks-logo.png" },
              { name: "Notion", logo: "path-to-notion-logo.png" },
            ].map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1a1a1a] rounded-xl p-6 flex flex-col items-center justify-center
                gap-3 border border-gray-800/20 hover:border-orange-500/20
                transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 flex items-center justify-center">
                  {/* Replace with actual logos */}
                  <div className="text-4xl">
                    {index === 0 && "🔗"}
                    {index === 1 && "💬"}
                    {index === 2 && "📧"}
                    {index === 3 && "🎥"}
                    {index === 4 && "📊"}
                    {index === 5 && "💼"}
                    {index === 6 && "💰"}
                    {index === 7 && "📝"}
                  </div>
                </div>
                <span className="text-gray-400 text-sm text-center">
                  {integration.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-orange-500/10 to-blue-500/10"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your HR?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of organizations already using our platform
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register"
              className="inline-block px-8 py-3 rounded-xl text-white bg-orange-500 
                       hover:bg-orange-600 transition-all duration-300
                       hover:shadow-lg hover:shadow-orange-500/25"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
