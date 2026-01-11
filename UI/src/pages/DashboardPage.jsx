import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart2, Activity, ShieldCheck, ArrowRight } from 'lucide-react';

const DashboardPage = () => {
    const navigate = useNavigate();

    // Model Performance Data for Graph
    const modelData = [
        { name: 'Decision Tree', accuracy: 72.44, fill: '#64748b' },
        { name: 'Logistic Reg.', accuracy: 72.80, fill: '#94a3b8' },
        { name: 'Random Forest', accuracy: 71.08, fill: '#3b82f6' }, // Highlighted
    ];

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
            <div className="dashboard-header">
                <div>
                    <h2 className="section-title" style={{ marginBottom: '0.5rem', textAlign: 'left' }}>Model Benchmark Results</h2>
                    <p className="section-desc" style={{ maxWidth: '800px', margin: '0 0 0 0', textAlign: 'left' }}>
                        We evaluated multiple machine learning algorithms. The Random Forest Classifier was selected for its superior balance of precision and recall.
                    </p>
                </div>
                <button onClick={() => navigate('/predict')} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    Start Prediction <ArrowRight size={20} />
                </button>
            </div>

            <div className="dashboard-grid">
                {/* Bar Chart */}
                <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BarChart2 size={20} color="var(--primary)" /> Accuracy Comparison
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={modelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
                            <XAxis type="number" domain={[0, 100]} stroke="var(--text-secondary)" />
                            <YAxis dataKey="name" type="category" width={100} stroke="var(--text-secondary)" />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', borderRadius: '0.5rem' }}
                                itemStyle={{ color: 'var(--text-main)' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Bar dataKey="accuracy" barSize={30} radius={[0, 4, 4, 0]}>
                                {modelData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Confusion Matrix / Precision-Recall Visual */}
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Activity size={20} color="var(--primary)" /> Confusion Matrix (Test Set)
                    </h3>

                    <div className="matrix-grid">
                        <div></div>
                        <div className="matrix-header-col">Pred: Disease</div>
                        <div className="matrix-header-col">Pred: Healthy</div>

                        <div className="matrix-header-row">Actual: Disease</div>
                        <div className="matrix-cell matrix-tp">
                            <div className="count">5,100</div>
                            <div className="label">True Positive</div>
                        </div>
                        <div className="matrix-cell matrix-fn">
                            <div className="count">1,900</div>
                            <div className="label">False Negative</div>
                        </div>

                        <div className="matrix-header-row">Actual: Healthy</div>
                        <div className="matrix-cell matrix-fp">
                            <div className="count">1,850</div>
                            <div className="label">False Positive</div>
                        </div>
                        <div className="matrix-cell matrix-tn">
                            <div className="count">5,150</div>
                            <div className="label">True Negative</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card table-container" style={{ padding: '0', overflow: 'hidden' }}>
                <table className="benchmark-table">
                    <thead>
                        <tr>
                            <th style={{ width: '350%', fontSize: '0.8rem' }}>Model Name</th>
                            <th style={{ width: '30%', fontSize: '0.8rem' }}>Accuracy Score</th>
                            <th style={{ width: '35%', fontSize: '0.73rem' }}>Performance Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Random Forest Classifier</td>
                            <td>71.08%</td>
                            <td><span className="badge badge-secondary">Baseline</span></td>
                        </tr>
                        <tr style={{ background: 'rgba(37,99,235,0.1)' }}>
                            <td>Logistic Regression</td>
                            <td style={{ fontWeight: '700', color: 'var(--primary-light)' }}>72.80%</td>
                            <td style={{ fontWeight: '700', color: 'var(--primary-light)' }}><span className="badge badge-success">Selected</span></td>
                        </tr>
                        <tr>
                            <td>Decision Tree</td>
                            <td>72.44%</td>
                            <td><span className="badge badge-secondary">Standard</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardPage;
