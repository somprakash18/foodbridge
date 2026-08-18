import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("FoodBridge React ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-2xl font-black">
              ⚠️
            </div>
            <h1 className="text-xl font-black text-white">Something went wrong</h1>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              FoodBridge encountered a temporary rendering issue. Please click below to reload the application.
            </p>
            {this.state.error && (
              <div className="p-3 bg-slate-950 rounded-xl text-[11px] font-mono text-rose-300 text-left overflow-x-auto max-h-32 border border-slate-800">
                {this.state.error.toString()}
              </div>
            )}
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}
              className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg transition-all"
            >
              Reload FoodBridge App
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
