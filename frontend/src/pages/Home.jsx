import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import ExperimentCard from '../components/ExperimentCard';
import StudyModuleCard from '../components/StudyModuleCard';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [experiments, setExperiments] = useState([]);
  const [modules, setModules] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expRes, modRes, prodRes] = await Promise.all([
          api.get('/experiments'),
          api.get('/study-modules'),
          api.get('/products'),
        ]);
        setExperiments(expRes.data);
        setModules(modRes.data);
        setProducts(prodRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Chetna Academy</h1>
          <p className="text-xl md:text-2xl mb-6">Empowering Minds Through Practical Education</p>
          <p className="text-lg max-w-2xl mx-auto">
            The only academy in your area with a dedicated <strong className="text-yellow-300">STEM LAB</strong>. 
            We believe in "Learning by Doing" – bridging the gap between theory and practice.
          </p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Vision</h2>
            <p className="text-gray-600 mb-4">
              We strive to create an environment where students not only learn but also innovate. 
              With our state-of-the-art STEM lab, we encourage hands-on experiments and real-world problem solving.
            </p>
            <p className="text-gray-600">
              Our expert mentors from esteemed backgrounds guide students to excel in academics and competitive exams.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-500">
            <h3 className="text-xl font-semibold mb-3">Why Choose Us?</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Demonstrative Learning with STEM Lab</li>
              <li>✓ Personalized Guidance by Bureaucrats & Engineers</li>
              <li>✓ Complete Course Coverage with Pre-Printed Modules</li>
              <li>✓ Regular Tests & Performance Reports</li>
              <li>✓ Coding Classes as per Syllabus</li>
              <li>✓ Foundation for Olympiad, NDA, NEET, JEE</li>
            </ul>
          </div>
        </div>
      </div>

    

      {/* Facilities Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Facilities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="font-bold text-lg mb-2">🔬 Circuit, Electronics & Hardware Lab</h3>
            <p className="text-gray-600">Hands-on experience with real components.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="font-bold text-lg mb-2">📊 Mathematical Simulation Lab</h3>
            <p className="text-gray-600">Software-based learning for complex concepts.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="font-bold text-lg mb-2">💻 Coding Classes</h3>
            <p className="text-gray-600">As per class syllabus, building future skills.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="font-bold text-lg mb-2">🧪 Science Projects & Models</h3>
            <p className="text-gray-600">Encouraging creativity and innovation.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="font-bold text-lg mb-2">🌟 Personality Development</h3>
            <p className="text-gray-600">Confidence building and communication skills.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
            <h3 className="font-bold text-lg mb-2">📖 Pre-Printed Modules</h3>
            <p className="text-gray-600">Complete course coverage with PYQ practices.</p>
          </div>
        </div>
      </div>

      {/* Experiments Section */}
      {experiments.length > 0 && (
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Experiments Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {experiments.map(exp => (
                <ExperimentCard key={exp.id} experiment={exp} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Study Modules Section */}
      {modules.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">📚 Study Modules & Question Set</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {modules.map(module => (
                <StudyModuleCard key={module.id} module={module} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      {products.length > 0 && (
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">🛒 Our Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location & Contact Info */}
      <div className="bg-white py-12 border-t">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Visit Us</h3>
          <p className="text-gray-600 mb-2">Near Amity University, Malhaur, Lucknow-U.P 226010</p>
          <div className="flex justify-center gap-6 flex-wrap mt-4">
            <a href="tel:8960628583" className="text-blue-600 hover:underline">📞 8960628583</a>
            <a href="mailto:chetna.xnava@gmail.com" className="text-blue-600 hover:underline">✉️ chetna.xnava@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}