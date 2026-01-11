import React from 'react';
import { Heart, Activity, Smile, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

const PreventionPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const sections = [
        {
            title: "Eat a Healthy Diet",
            icon: <Activity className="text-primary" />,
            points: [
                "Eat more fruits, vegetables, whole grains.",
                "Reduce oily, fried, and junk food.",
                "Avoid too much salt and sugar."
            ]
        },
        {
            title: "Exercise Regularly",
            icon: <Activity className="text-primary" />,
            points: [
                "Do at least 30 minutes of walking, jogging, or cycling daily.",
                "Do yoga or breathing exercises."
            ]
        },
        {
            title: "Maintain Healthy Weight",
            icon: <Activity className="text-primary" />,
            points: [
                "Keep your BMI in the normal range.",
                "Avoid obesity."
            ]
        },
        {
            title: "Quit Smoking & Alcohol",
            icon: <Activity className="text-danger" />,
            points: [
                "Do not smoke.",
                "Limit or avoid alcohol."
            ]
        },
        {
            title: "Control Blood Pressure",
            icon: <Activity className="text-primary" />,
            points: [
                "Check BP regularly.",
                "Reduce stress and salt intake."
            ]
        },
        {
            title: "Manage Blood Sugar",
            icon: <Activity className="text-primary" />,
            points: [
                "Get sugar levels tested.",
                "Follow a diabetic-friendly diet if needed."
            ]
        },
        {
            title: "Reduce Stress",
            icon: <Smile className="text-primary" />,
            points: [
                "Meditate, sleep 7–8 hours daily.",
                "Avoid overthinking and anxiety."
            ]
        },
        {
            title: "Regular Health Checkups",
            icon: <Heart className="text-primary" />,
            points: [
                "ECG, cholesterol, BP tests yearly."
            ]
        },
        {
            title: "Stay Hydrated",
            icon: <Droplet className="text-blue-400" />,
            points: [
                "Drink enough water daily."
            ]
        },
        {
            title: "Take Prescribed Medicines",
            icon: <Activity className="text-primary" />,
            points: [
                "Never skip doctor-prescribed heart medicines."
            ]
        }
    ];

    return (
        <div className="container" style={{ paddingBottom: '6rem' }}>
            <motion.div
                className="hero"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
                <h1>Cardio Disease <br /><span>Prevention Tips</span></h1>
                <p>Simple lifestyle changes can make a big difference.</p>
            </motion.div>

            <motion.div
                className="prevention-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {sections.map((section, index) => (
                    <motion.div key={index} className="card" variants={itemVariants}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            {section.icon} {section.title}
                        </h3>
                        <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)' }}>
                            {section.points.map((point, idx) => (
                                <li key={idx} style={{ marginBottom: '0.5rem' }}>{point}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default PreventionPage;
