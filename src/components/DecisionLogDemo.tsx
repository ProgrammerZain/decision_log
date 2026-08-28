import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Calendar, 
  User, 
  X, 
  ArrowLeft, 
  Copy, 
  Check, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Ban,
  TrendingUp,
  Sparkles,
  Info,
  Layers
} from 'lucide-react';
import { Button } from '../common';

// Define Interface for Decision items
export interface Decision {
  id: string;
  title: string;
  category: string;
  status: 'Active' | 'Proposed' | 'Superseded' | 'Deprecated' | 'Approved';
  impact: 'High' | 'Medium' | 'Low';
  date: string;
  authorName: string;
  authorRole: string;
  rationale: string;
  details: string;
}

interface DecisionLogDemoProps {
  onNavigate: (view: 'landing' | 'demo') => void;
  onDrawerToggle?: (isOpen: boolean) => void;
}

// Initial default decisions for the demo sandbox
const DEFAULT_DECISIONS: Decision[] = [
  {
    id: 'dec-1',
    title: 'Migrate Frontend Platform to React 19',
    category: 'Frontend',
    status: 'Active',
    impact: 'High',
    date: '2026-08-15',
    authorName: 'Sarah Jenkins',
    authorRole: 'Lead Frontend Dev',
    rationale: 'Leverage native compiler improvements and action hooks to reduce boilerplate code and boost rendering performance.',
    details: 'We evaluated React 18 with custom query hooks and compared it against React 19. React 19 Action Hooks and the new Suspense-enabled APIs provide a much cleaner frontend architecture. We did not notice any major breaking changes during the dry run. Server Actions are currently disabled as we run a client-only Vite app.'
  },
  {
    id: 'dec-2',
    title: 'Adopt Tailwind CSS v4.0 for styling',
    category: 'Design System',
    status: 'Active',
    impact: 'Medium',
    date: '2026-08-20',
    authorName: 'Jordan Vance',
    authorRole: 'Principal Designer',
    rationale: 'Tailwind v4 offers a zero-config setup, native lightningcss compilation, and an improved CSS-first configuration theme engine.',
    details: 'Using the new @theme directive in index.css is much cleaner than maintaining a separate tailwind.config.js file. The build speed is roughly 2.5x faster. Key benefit is the simpler setup in our Vite config, removing Tailwind PostCSS plugin dependencies.'
  },
  {
    id: 'dec-3',
    title: 'Use DynamoDB for caching session states',
    category: 'Infrastructure',
    status: 'Superseded',
    impact: 'High',
    date: '2025-11-10',
    authorName: 'Alex Rivera',
    authorRole: 'Infrastructure Lead',
    rationale: 'DynamoDB provides low-latency key-value lookups with minimal operational overhead.',
    details: 'Originally proposed for caching, but superseded by PostgreSQL pg_session as we consolidated our database storage footprints to reduce AWS costs.'
  },
  {
    id: 'dec-4',
    title: 'Consolidate database storage into PostgreSQL',
    category: 'Infrastructure',
    status: 'Active',
    impact: 'High',
    date: '2026-06-05',
    authorName: 'Alex Rivera',
    authorRole: 'Infrastructure Lead',
    rationale: 'Consolidates DynamoDB and SQLite instances into a single, reliable PostgreSQL cluster, cutting cost by 40% and simplifying backups.',
    details: 'We migrated our session tables from DynamoDB to Postgres and consolidated our metadata database. This decision supersedes decision dec-3. PostgreSQL JSONB columns are used for flexible log storing without schema locking.'
  },
  {
    id: 'dec-5',
    title: 'Implement JWT based stateless authentication',
    category: 'Security',
    status: 'Proposed',
    impact: 'High',
    date: '2026-08-27',
    authorName: 'Elena Rostova',
    authorRole: 'Security Engineer',
    rationale: 'Standardize authentication across mobile and web clients using stateless JSON Web Tokens for horizontal scalability.',
    details: 'Currently under review. We are looking into whether we should use an external auth provider (Auth0/Clerk) or implement a custom stateless JWT token server. Stakeholders are concerned about token revocation security.'
  }
];

export const DecisionLogDemo: React.FC<DecisionLogDemoProps> = ({ onNavigate, onDrawerToggle }) => {
  // Decisions State - reads from session storage or defaults
  const [decisions, setDecisions] = useState<Decision[]>(() => {
    const stored = sessionStorage.getItem('decision_log_data');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing stored decisions', e);
      }
    }
    return DEFAULT_DECISIONS;
  });

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Selected Decision for Drawer View
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  // Form State for Create / Edit
  const [isFormDrawerOpen, setIsFormDrawerOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form inputs
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Architecture');
  const [formStatus, setFormStatus] = useState<Decision['status']>('Active');
  const [formImpact, setFormImpact] = useState<Decision['impact']>('Medium');
  const [formDate, setFormDate] = useState('');
  const [formAuthorName, setFormAuthorName] = useState('');
  const [formAuthorRole, setFormAuthorRole] = useState('');
  const [formRationale, setFormRationale] = useState('');
  const [formDetails, setFormDetails] = useState('');

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Freeze background page scroll when modal/drawer is open
  useEffect(() => {
    const isAnyOpen = isDetailDrawerOpen || isFormDrawerOpen;
    if (isAnyOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isDetailDrawerOpen, isFormDrawerOpen]);

  // Notify parent on drawer toggles
  useEffect(() => {
    if (onDrawerToggle) {
      onDrawerToggle(isDetailDrawerOpen || isFormDrawerOpen);
    }
  }, [isDetailDrawerOpen, isFormDrawerOpen, onDrawerToggle]);

  // Cleanup drawer state on unmount
  useEffect(() => {
    return () => {
      if (onDrawerToggle) {
        onDrawerToggle(false);
      }
    };
  }, [onDrawerToggle]);

  // Sync to session storage on change
  useEffect(() => {
    sessionStorage.setItem('decision_log_data', JSON.stringify(decisions));
  }, [decisions]);

  // Toast Trigger Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Status Style Helpers (Treats 'Approved' the same as 'Active')
  const getStatusIcon = (status: Decision['status']) => {
    switch (status) {
      case 'Active':
      case 'Approved':
        return <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />;
      case 'Proposed':
        return <AlertCircle className="h-4.5 w-4.5 text-sky-400" />;
      case 'Superseded':
        return <Clock className="h-4.5 w-4.5 text-amber-400" />;
      case 'Deprecated':
        return <Ban className="h-4.5 w-4.5 text-rose-400" />;
    }
  };

  const getStatusStyles = (status: Decision['status']) => {
    switch (status) {
      case 'Active':
      case 'Approved':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/35 glow-active';
      case 'Proposed':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/35 glow-proposed';
      case 'Superseded':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/35 glow-superseded';
      case 'Deprecated':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/35 glow-deprecated';
    }
  };

  const getImpactBadgeStyles = (impact: Decision['impact']) => {
    switch (impact) {
      case 'High':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'Medium':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Low':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    }
  };

  // Dynamic Category Colors
  const getCategoryBgColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'frontend':
        return 'bg-indigo-velvet-500';
      case 'design system':
        return 'bg-mauve-magic-500';
      case 'infrastructure':
        return 'bg-amber-500';
      case 'security':
        return 'bg-rose-500';
      default:
        return 'bg-royal-violet-500';
    }
  };

  // Search Highlight Helper
  const renderHighlightedText = (text: string, query: string) => {
    if (!query) return <span>{text}</span>;
    const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="search-highlight">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  // Open Form for Creating New
  const handleOpenCreate = () => {
    setFormMode('create');
    setEditingId(null);
    setFormTitle('');
    setFormCategory('Architecture');
    setFormStatus('Active');
    setFormImpact('Medium');
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormAuthorName('Developer User');
    setFormAuthorRole('Software Engineer');
    setFormRationale('');
    setFormDetails('');
    setIsFormDrawerOpen(true);
    setIsDetailDrawerOpen(false);
  };

  // Open Form for Editing Existing
  const handleOpenEdit = (dec: Decision) => {
    setFormMode('edit');
    setEditingId(dec.id);
    setFormTitle(dec.title);
    setFormCategory(dec.category);
    setFormStatus(dec.status);
    setFormImpact(dec.impact);
    setFormDate(dec.date);
    setFormAuthorName(dec.authorName);
    setFormAuthorRole(dec.authorRole);
    setFormRationale(dec.rationale);
    setFormDetails(dec.details);
    setIsFormDrawerOpen(true);
    setIsDetailDrawerOpen(false);
  };

  // Form Submit Handler
  const handleSaveDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formRationale.trim()) {
      showToast('⚠️ Please fill in all required fields.');
      return;
    }

    if (formMode === 'create') {
      const newDecision: Decision = {
        id: `dec-${Date.now()}`,
        title: formTitle,
        category: formCategory,
        status: formStatus,
        impact: formImpact,
        date: formDate || new Date().toISOString().split('T')[0],
        authorName: formAuthorName || 'Developer User',
        authorRole: formAuthorRole || 'Software Engineer',
        rationale: formRationale,
        details: formDetails
      };
      setDecisions([newDecision, ...decisions]);
      showToast('🎉 Decision logged successfully!');
    } else {
      // Edit mode
      setDecisions(decisions.map(d => d.id === editingId ? {
        ...d,
        title: formTitle,
        category: formCategory,
        status: formStatus,
        impact: formImpact,
        date: formDate,
        authorName: formAuthorName,
        authorRole: formAuthorRole,
        rationale: formRationale,
        details: formDetails
      } : d));
      showToast('✏️ Decision updated successfully!');
    }
    setIsFormDrawerOpen(false);
  };

  // Delete Action
  const handleDeleteDecision = (id: string) => {
    if (confirm('Are you sure you want to delete this decision record? This cannot be undone.')) {
      setDecisions(decisions.filter(d => d.id !== id));
      setIsDetailDrawerOpen(false);
      setSelectedDecision(null);
      showToast('🗑️ Decision deleted.');
    }
  };

  // Copy Link/Metadata Action
  const handleCopyLink = (dec: Decision) => {
    const textToCopy = `Decision Log URL Mock: [${dec.title}] status: ${dec.status}, impact: ${dec.impact}, rationale: "${dec.rationale}" - by ${dec.authorName}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(dec.id);
    showToast('📋 Copied summary details to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Reset Demo to Default State
  const handleResetDemo = () => {
    if (confirm('Reset decisions back to the original mock dataset?')) {
      setDecisions(DEFAULT_DECISIONS);
      sessionStorage.removeItem('decision_log_data');
      setCategoryFilter('All');
      setStatusFilter('All');
      setSearchQuery('');
      showToast('🔄 Reset dashboard to defaults.');
    }
  };

  // Get categories for select and chips dynamically
  const categories = Array.from(new Set(decisions.map(d => d.category)));

  // Filter Decisions list based on search query (visible only), status and category
  const filteredDecisions = decisions.filter(d => {
    // Search visible fields only! details is hidden so it is excluded.
    const matchesSearch = 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.authorRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.rationale.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.impact.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Treat 'Approved' status as 'Active'
    const matchesStatus = statusFilter === 'All' || 
      (statusFilter === 'Active' 
        ? (d.status === 'Active' || d.status === 'Approved')
        : d.status === statusFilter);

    const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Calculate statistics based on the active filtered results!
  const totalDecs = filteredDecisions.length;
  const activeDecs = filteredDecisions.filter(d => d.status === 'Active' || d.status === 'Approved').length;
  const highImpactDecs = filteredDecisions.filter(d => d.impact === 'High').length;

  // Aware category counting logic:
  // Count matches per category based on active search queries and active status filters,
  // AND limit it by category filter if category filter is active.
  const getCategoryCount = (catName: string) => {
    return decisions.filter(d => {
      const matchesSearch = 
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.authorRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.rationale.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.impact.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || 
        (statusFilter === 'Active' 
          ? (d.status === 'Active' || d.status === 'Approved')
          : d.status === statusFilter);

      const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
      const matchesTarget = d.category === catName;

      return matchesSearch && matchesStatus && matchesCategory && matchesTarget;
    }).length;
  };

  // Aware counting logic for 'All' category chip
  const getAllCategoryCount = () => {
    return decisions.filter(d => {
      const matchesSearch = 
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.authorRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.rationale.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.impact.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || 
        (statusFilter === 'Active' 
          ? (d.status === 'Active' || d.status === 'Approved')
          : d.status === statusFilter);

      const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    }).length;
  };

  // Aware status tab counting logic (Treats 'Approved' status as 'Active')
  const getStatusCount = (statusName: string) => {
    return decisions.filter(d => {
      const matchesSearch = 
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.authorRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.rationale.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.impact.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || 
        (statusFilter === 'Active' 
          ? (d.status === 'Active' || d.status === 'Approved')
          : d.status === statusFilter);

      const matchesTarget = statusName === 'Active' 
        ? (d.status === 'Active' || d.status === 'Approved')
        : d.status === statusName;

      return matchesSearch && matchesCategory && matchesStatus && matchesTarget;
    }).length;
  };

  // Aware counting logic for 'All' status tab
  const getAllStatusCount = () => {
    return decisions.filter(d => {
      const matchesSearch = 
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.authorRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.rationale.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.impact.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || 
        (statusFilter === 'Active' 
          ? (d.status === 'Active' || d.status === 'Approved')
          : d.status === statusFilter);

      return matchesSearch && matchesCategory && matchesStatus;
    }).length;
  };

  // Modal Renderers inside React Portal
  const renderDetailModal = () => {
    if (!isDetailDrawerOpen || !selectedDecision) return null;
    return createPortal(
      <div className="fixed inset-0 z-[100] overflow-hidden flex justify-end">
        {/* Backdrop Overlay */}
        <div 
          className="absolute inset-0 bg-[#030008]/75 backdrop-blur-sm transition-opacity duration-300 animate-fade-in cursor-pointer"
          onClick={() => setIsDetailDrawerOpen(false)}
        />

        {/* Panel content: 100vh Right-aligned sliding drawer */}
        <div className="relative w-full max-w-xl bg-[#0c0021] border-l border-indigo-ink-500/30 shadow-2xl h-screen flex flex-col overflow-hidden animate-slide-in-right z-10 text-left">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-indigo-ink-500/15 flex items-center justify-between">
            <div>
              <span className="text-xs text-mauve-600 font-semibold uppercase tracking-wider">Architecture Decision Record</span>
              <h2 className="text-lg font-black text-white mt-0.5">Decision Details</h2>
            </div>
            <button 
              onClick={() => setIsDetailDrawerOpen(false)}
              className="p-1.5 rounded-lg text-mauve-600 hover:text-white hover:bg-indigo-ink-500/20 transition-colors cursor-pointer focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body (Scrolls inside itself) */}
          <div className="p-6 space-y-6 overflow-y-auto flex-grow text-white">
            {/* Header Info */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2.5">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${getStatusStyles(selectedDecision.status)}`}>
                  {getStatusIcon(selectedDecision.status)}
                  {selectedDecision.status}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-bold ${getImpactBadgeStyles(selectedDecision.impact)}`}>
                  {selectedDecision.impact} Impact
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-ink-500/20 bg-indigo-ink-500/10 text-mauve-magic-500 text-xs font-semibold">
                  {selectedDecision.category}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {selectedDecision.title}
              </h1>
            </div>

            {/* Meta information grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl border border-indigo-ink-500/15 bg-indigo-ink-100/5">
              <div className="flex flex-col">
                <span className="text-[10px] text-mauve-600 font-semibold uppercase tracking-wider">Owner / Author</span>
                <span className="text-sm font-bold text-white mt-1 flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-royal-violet-500" />
                  {selectedDecision.authorName}
                </span>
                <span className="text-[10px] text-mauve-600">{selectedDecision.authorRole}</span>
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] text-mauve-600 font-semibold uppercase tracking-wider">Date Recorded</span>
                <span className="text-sm font-bold text-white mt-1 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-royal-violet-500" />
                  {selectedDecision.date}
                </span>
              </div>
            </div>

            {/* Rationale Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-indigo-ink-500/10 pb-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-mauve-magic-500" />
                What was Decided & Why
              </h3>
              <p className="text-xs sm:text-sm text-mauve-900 leading-relaxed font-semibold">
                {selectedDecision.rationale}
              </p>
            </div>

            {/* Details Section */}
            {selectedDecision.details && (
              <div className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-indigo-ink-500/10 pb-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-mauve-magic-500" />
                  Detailed Context & Alternatives Considered
                </h3>
                <p className="text-xs sm:text-sm text-mauve-600 leading-relaxed whitespace-pre-wrap">
                  {selectedDecision.details}
                </p>
              </div>
            )}
          </div>

          {/* Drawer Footer Actions: No ID field here */}
          <div className="p-4 border-t border-indigo-ink-500/15 bg-dark-amethyst-500/80 flex items-center justify-end gap-3">

            <div className="flex items-center gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => handleOpenEdit(selectedDecision)}
                className="flex items-center gap-1.5"
              >
                <Edit2 className="h-3.5 w-3.5" /> Edit Log
              </Button>
              <button 
                onClick={() => handleDeleteDecision(selectedDecision.id)}
                className="px-4 py-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-all text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer focus:outline-none"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          </div>

        </div>
      </div>,
      document.body
    );
  };

  const renderFormModal = () => {
    if (!isFormDrawerOpen) return null;
    return createPortal(
      <div className="fixed inset-0 z-[100] overflow-hidden flex justify-end">
        {/* Backdrop Overlay */}
        <div 
          className="absolute inset-0 bg-[#030008]/75 backdrop-blur-sm transition-opacity duration-300 animate-fade-in cursor-pointer"
          onClick={() => setIsFormDrawerOpen(false)}
        />

        {/* Panel content: 100vh Right-aligned sliding drawer */}
        <div className="relative w-full max-w-xl bg-[#0c0021] border-l border-indigo-ink-500/30 shadow-2xl h-full flex flex-col overflow-hidden animate-slide-in-right z-10 text-left">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-indigo-ink-500/15 flex items-center justify-between">
            <div>
              <span className="text-xs text-mauve-600 font-semibold uppercase tracking-wider">Decision Records Form</span>
              <h2 className="text-lg font-black text-white mt-0.5">
                {formMode === 'create' ? 'Log New Decision' : 'Edit Decision Record'}
              </h2>
            </div>
            <button 
              onClick={() => setIsFormDrawerOpen(false)}
              className="p-1.5 rounded-lg text-mauve-600 hover:text-white hover:bg-indigo-ink-500/20 transition-colors cursor-pointer focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body Form: Form scrolls within itself, keeps buttons stuck directly beneath inputs */}
          <form onSubmit={handleSaveDecision} className="flex flex-col flex-grow overflow-hidden">
            <div className="p-6 space-y-4 overflow-y-auto flex-grow text-white">
              {/* Form Fields */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-white font-bold uppercase tracking-wider">
                  What was decided (Title) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Migrate primary backend database to PostgreSQL"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-violet-midnight-500/30 border border-indigo-ink-500/30 text-white placeholder-mauve-600/40 rounded-xl focus:outline-none focus:border-royal-violet-500 focus:ring-1 focus:ring-royal-violet-500 text-sm transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-white font-bold uppercase tracking-wider">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Frontend, Architecture, Security"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-2 bg-violet-midnight-500/30 border border-indigo-ink-500/30 text-white placeholder-mauve-600/40 rounded-xl focus:outline-none focus:border-royal-violet-500 focus:ring-1 focus:ring-royal-violet-500 text-xs transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-white font-bold uppercase tracking-wider">
                    Decision Date
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-4 py-2 bg-violet-midnight-500/30 border border-indigo-ink-500/30 text-white rounded-xl focus:outline-none focus:border-royal-violet-500 focus:ring-1 focus:ring-royal-violet-500 text-xs transition-all cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-white font-bold uppercase tracking-wider">
                    Status (Active State)
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as Decision['status'])}
                    className="w-full px-3 py-2 bg-violet-midnight-500/30 border border-indigo-ink-500/30 text-white rounded-xl focus:outline-none focus:border-royal-violet-500 focus:ring-1 focus:ring-royal-violet-500 text-xs transition-all cursor-pointer"
                  >
                    <option value="Active">Active / Approved</option>
                    <option value="Proposed">Proposed</option>
                    <option value="Superseded">Superseded</option>
                    <option value="Deprecated">Deprecated</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-white font-bold uppercase tracking-wider">
                    Impact Level
                  </label>
                  <select
                    value={formImpact}
                    onChange={(e) => setFormImpact(e.target.value as Decision['impact'])}
                    className="w-full px-3 py-2 bg-violet-midnight-500/30 border border-indigo-ink-500/30 text-white rounded-xl focus:outline-none focus:border-royal-violet-500 focus:ring-1 focus:ring-royal-violet-500 text-xs transition-all cursor-pointer"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-white font-bold uppercase tracking-wider">
                    Author / Owner Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Rivera"
                    value={formAuthorName}
                    onChange={(e) => setFormAuthorName(e.target.value)}
                    className="w-full px-4 py-2 bg-violet-midnight-500/30 border border-indigo-ink-500/30 text-white placeholder-mauve-600/40 rounded-xl focus:outline-none focus:border-royal-violet-500 focus:ring-1 focus:ring-royal-violet-500 text-xs transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-white font-bold uppercase tracking-wider">
                    Author / Owner Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Infrastructure Lead"
                    value={formAuthorRole}
                    onChange={(e) => setFormAuthorRole(e.target.value)}
                    className="w-full px-4 py-2 bg-violet-midnight-500/30 border border-indigo-ink-500/30 text-white placeholder-mauve-600/40 rounded-xl focus:outline-none focus:border-royal-violet-500 focus:ring-1 focus:ring-royal-violet-500 text-xs transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-white font-bold uppercase tracking-wider">
                  Why it was decided (Rationale) *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Summarize the core reason, motivations, and the problem solved by this decision."
                  value={formRationale}
                  onChange={(e) => setFormRationale(e.target.value)}
                  className="w-full px-4 py-2 bg-violet-midnight-500/30 border border-indigo-ink-500/30 text-white placeholder-mauve-600/40 rounded-xl focus:outline-none focus:border-royal-violet-500 focus:ring-1 focus:ring-royal-violet-500 text-xs transition-all resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-white font-bold uppercase tracking-wider">
                  Detailed Context & Alternatives (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide additional architectural notes, technical references, or options that were rejected and why."
                  value={formDetails}
                  onChange={(e) => setFormDetails(e.target.value)}
                  className="w-full px-4 py-2 bg-violet-midnight-500/30 border border-indigo-ink-500/30 text-white placeholder-mauve-600/40 rounded-xl focus:outline-none focus:border-royal-violet-500 focus:ring-1 focus:ring-royal-violet-500 text-xs transition-all resize-y"
                />
              </div>
            </div>

            {/* Form Footer Actions (Sitting directly below inputs, at bottom of drawer view) */}
            <div className="p-4 border-t border-indigo-ink-500/15 bg-dark-amethyst-500/80 flex items-center justify-end gap-3 mt-auto">
              <Button 
                type="button"
                variant="secondary" 
                size="sm" 
                onClick={() => setIsFormDrawerOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary" 
                size="sm"
              >
                {formMode === 'create' ? 'Save Record' : 'Save Changes'}
              </Button>
            </div>
          </form>

        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="min-h-screen bg-dark-amethyst-400 text-mauve-900 pt-6 pb-20 relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans antialiased">
      {/* Decorative glows */}
      <div className="absolute top-10 left-10 -z-10 h-64 w-64 rounded-full bg-royal-violet-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 -z-10 h-72 w-72 rounded-full bg-mauve-magic-500/10 blur-[110px] pointer-events-none" />

      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16002b] border border-royal-violet-500/50 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in backdrop-blur-md glow-proposed">
          <Sparkles className="h-4.5 w-4.5 text-mauve-magic-500 animate-pulse" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-indigo-ink-500/20 mb-8">
        <div className="text-left">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-1.5 text-xs text-mauve-600 hover:text-white transition-colors mb-2 cursor-pointer focus:outline-none"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Landing Page
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Layers className="h-7 w-7 text-mauve-magic-500" />
              Decision Log <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-royal-violet-600/30 text-mauve-magic-500 border border-royal-violet-500/20">Sandbox</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-mauve-600 mt-1.5 leading-relaxed">
            Record, audit, and analyze critical architecture & product decisions in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Button variant="secondary" size="sm" onClick={handleResetDemo}>
            Reset Data
          </Button>
          <Button variant="accent" size="md" onClick={handleOpenCreate} className="shadow-md shadow-mauve-magic-500/10">
            <Plus className="mr-1.5 h-4.5 w-4.5" /> Log Decision
          </Button>
        </div>
      </div>

      {/* Stats Counter Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="relative overflow-hidden rounded-2xl border border-indigo-ink-500/20 bg-gradient-to-b from-violet-midnight-500/40 to-dark-amethyst-500/60 backdrop-blur-md p-5 flex items-center justify-between shadow-lg group hover:border-royal-violet-500/30 transition-all duration-300">
          <div className="text-left">
            <span className="text-xs text-mauve-600 font-semibold uppercase tracking-wider">Active Decisions</span>
            <div className="text-3xl font-black text-white mt-1 group-hover:scale-105 transition-transform duration-200">{activeDecs}</div>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/25 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-indigo-ink-500/20 bg-gradient-to-b from-violet-midnight-500/40 to-dark-amethyst-500/60 backdrop-blur-md p-5 flex items-center justify-between shadow-lg group hover:border-royal-violet-500/30 transition-all duration-300">
          <div className="text-left">
            <span className="text-xs text-mauve-600 font-semibold uppercase tracking-wider">High Impact Cases</span>
            <div className="text-3xl font-black text-white mt-1 group-hover:scale-105 transition-transform duration-200">{highImpactDecs}</div>
          </div>
          <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/25 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-rose-400" />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-indigo-ink-500/20 bg-gradient-to-b from-violet-midnight-500/40 to-dark-amethyst-500/60 backdrop-blur-md p-5 flex items-center justify-between shadow-lg group hover:border-royal-violet-500/30 transition-all duration-300">
          <div className="text-left">
            <span className="text-xs text-mauve-600 font-semibold uppercase tracking-wider">Total Recorded</span>
            <div className="text-3xl font-black text-white mt-1 group-hover:scale-105 transition-transform duration-200">{totalDecs}</div>
          </div>
          <div className="p-3 bg-royal-violet-500/10 rounded-xl border border-royal-violet-500/25 flex items-center justify-center">
            <Layers className="h-6 w-6 text-mauve-magic-500" />
          </div>
        </div>
      </div>

      {/* Filtering, Search & Toolbar */}
      <div className="flex flex-col lg:flex-row gap-5 items-stretch lg:items-center justify-between mb-6 p-4.5 rounded-2xl border border-indigo-ink-500/20 bg-indigo-ink-100/5 backdrop-blur-[2px]">
        {/* Search */}
        <div className="relative flex-grow max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-mauve-600" />
          <input
            type="text"
            placeholder="Search decisions by visible title, author, key rationale..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-violet-midnight-500/40 border border-indigo-ink-500/30 text-white placeholder-mauve-600/50 rounded-xl focus:outline-none focus:border-royal-violet-500 focus:ring-1 focus:ring-royal-violet-500 text-sm transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mauve-600 hover:text-white cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center justify-between sm:justify-start gap-4">
          {/* Category Dropdown Selection Option */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-mauve-600 font-medium">Category Option:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-violet-midnight-500/60 border border-indigo-ink-500/30 text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-royal-violet-500 focus:ring-1 focus:ring-royal-violet-500 cursor-pointer"
            >
              <option value="All">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Dynamic Category Chips - aware of search queries, status filters, and active category options */}
      <div className="flex flex-wrap items-center gap-2 mb-4 text-left">
        <span className="text-xs text-mauve-600 font-semibold mr-1">Category Chips:</span>
        <button
          onClick={() => setCategoryFilter('All')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer focus:outline-none ${
            categoryFilter === 'All'
              ? 'bg-royal-violet-600 text-white border-royal-violet-500 shadow-md'
              : 'bg-dark-amethyst-500/50 text-mauve-600 border-indigo-ink-500/15 hover:text-white'
          }`}
        >
          All ({getAllCategoryCount()})
        </button>
        {categories.map(cat => {
          const count = getCategoryCount(cat);
          const isSelected = categoryFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setCategoryFilter(isSelected ? 'All' : cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer focus:outline-none ${
                isSelected
                  ? 'bg-royal-violet-600 text-white border-royal-violet-500 shadow-md'
                  : 'bg-dark-amethyst-500/50 text-mauve-600 border-indigo-ink-500/15 hover:text-white font-medium'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}

        {/* Clear/Filter applied indicators */}
        {categoryFilter !== 'All' && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-royal-violet-600/20 text-mauve-magic-500 border border-royal-violet-500/30">
            Active Filter: {categoryFilter}
            <button 
              onClick={() => setCategoryFilter('All')}
              className="hover:text-white cursor-pointer ml-1"
              title="Clear Category Filter"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {/* Status Filter Tabs - fully dynamic counts */}
      <div className="flex overflow-x-auto gap-2 pb-3 mb-6 scrollbar-none border-b border-indigo-ink-500/10">
        {['All', 'Active', 'Proposed', 'Superseded', 'Deprecated'].map(status => {
          const count = status === 'All' ? getAllStatusCount() : getStatusCount(status);
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-all duration-200 whitespace-nowrap focus:outline-none ${
                statusFilter === status 
                  ? 'bg-royal-violet-600 text-white border-royal-violet-500 shadow-md shadow-royal-violet-950/20' 
                  : 'bg-dark-amethyst-500/50 text-mauve-600 hover:text-white border-indigo-ink-500/15'
              }`}
            >
              {status} <span className="ml-1 opacity-60 text-[10px] px-1.5 py-0.5 rounded-full bg-violet-midnight-500/50">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredDecisions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl border border-dashed border-indigo-ink-500/20 bg-indigo-ink-100/5 backdrop-blur-[2px] text-center max-w-lg mx-auto">
          <Info className="h-10 w-10 text-royal-violet-500 mb-3 animate-pulse" />
          <h3 className="text-white font-bold text-base">No decision logs found</h3>
          <p className="text-xs text-mauve-600 mt-1 max-w-sm">
            Try adjusting your search criteria or clear the filters. Alternatively, log a new project decision card.
          </p>
          <Button variant="primary" size="sm" onClick={handleOpenCreate} className="mt-4">
            <Plus className="mr-1 h-4 w-4" /> Log Decision
          </Button>
        </div>
      )}

      {/* Minimalist Timeline view */}
      {filteredDecisions.length > 0 && (
        <div className="relative border-l border-indigo-ink-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8 animate-fade-in text-left">
          {filteredDecisions.map((dec) => (
            <div key={dec.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div 
                onClick={() => {
                  setSelectedDecision(dec);
                  setIsDetailDrawerOpen(true);
                }}
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 bg-[#0c0021] flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-125 cursor-pointer z-10 ${
                  (dec.status === 'Active' || dec.status === 'Approved') ? 'border-emerald-500' :
                  dec.status === 'Proposed' ? 'border-sky-500' :
                  dec.status === 'Superseded' ? 'border-amber-500' :
                  'border-rose-500'
                }`}
              >
                <div className={`h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 rounded-full ${
                  (dec.status === 'Active' || dec.status === 'Approved') ? 'bg-emerald-500 animate-pulse' :
                  dec.status === 'Proposed' ? 'bg-sky-500' :
                  dec.status === 'Superseded' ? 'bg-amber-500' :
                  'bg-rose-500'
                }`} />
              </div>

              {/* Card content with Category Color Bar at the Top */}
              <div 
                onClick={() => {
                  setSelectedDecision(dec);
                  setIsDetailDrawerOpen(true);
                }}
                className="cursor-pointer border border-indigo-ink-500/20 bg-gradient-to-b from-violet-midnight-500/30 to-dark-amethyst-500/50 rounded-2xl hover:border-royal-violet-500/40 hover:shadow-md hover:shadow-royal-violet-500/5 transition-all duration-300 relative overflow-hidden"
              >
                {/* Same color line as the category color at the top */}
                <div className={`h-1.5 w-full ${getCategoryBgColor(dec.category)}`} />

                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-mauve-600 font-semibold tracking-wider uppercase">{dec.date}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-ink-500" />
                      <span className="text-xs text-mauve-900 font-medium">{dec.category}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-semibold w-fit ${getStatusStyles(dec.status)}`}>
                      {dec.status}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-white text-base group-hover:text-mauve-magic-500 transition-colors duration-150 mb-1.5">
                    {renderHighlightedText(dec.title, searchQuery)}
                  </h3>

                  <p className="text-xs text-mauve-600 leading-relaxed max-w-3xl mb-3">
                    {renderHighlightedText(dec.rationale, searchQuery)}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-3.5 border-t border-indigo-ink-500/10">
                    <span className="text-mauve-600">Logged by <strong className="text-white">{dec.authorName}</strong> ({dec.authorRole})</span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${getImpactBadgeStyles(dec.impact)}`}>
                      {dec.impact} Impact
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Portaled Drawers */}
      {renderDetailModal()}
      {renderFormModal()}

    </div>
  );
};
