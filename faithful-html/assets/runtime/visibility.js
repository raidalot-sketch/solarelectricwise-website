/* Native visibility callbacks for the retained animated-heading library. */
window.solarOnVisible = function(elements, callback, options = {}) {
 const nodes = Array.from(elements || []);
 if (!nodes.length) return;
 if (!('IntersectionObserver' in window)) { nodes.forEach(node => callback.call(node, 'down')); return; }
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
   callback.call(entry.target, 'down');
   if (options.triggerOnce !== false) observer.unobserve(entry.target);
  }
 }), {threshold: 0.05});
 nodes.forEach(node => observer.observe(node));
};
