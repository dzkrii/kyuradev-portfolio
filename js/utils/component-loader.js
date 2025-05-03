/**
 * Utilitas untuk memuat komponen HTML dari file terpisah
 */
const ComponentLoader = {
  /**
   * Memuat komponen HTML ke dalam elemen target
   * @param {string} path - Path ke file komponen HTML
   * @param {string} targetId - ID elemen target
   * @returns {Promise} - Promise yang menyelesaikan ketika komponen dimuat
   */
  load: async function (path, targetId) {
    try {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`Failed to load component: ${response.statusText}`);
      }

      const html = await response.text();
      const targetElement = document.getElementById(targetId);

      if (!targetElement) {
        throw new Error(`Target element with ID "${targetId}" not found`);
      }

      targetElement.innerHTML = html;

      // Trigger event untuk lifecycle hooks
      const event = new CustomEvent("component:loaded", {
        detail: {
          id: targetId,
          path: path,
        },
      });
      document.dispatchEvent(event);

      return true;
    } catch (error) {
      console.error("Component loading error:", error);
      return false;
    }
  },

  /**
   * Memuat beberapa komponen secara bersamaan
   * @param {Array} components - Array objek {path, targetId}
   * @returns {Promise} - Promise yang menyelesaikan ketika semua komponen dimuat
   */
  loadMany: async function (components) {
    const promises = components.map((comp) =>
      this.load(comp.path, comp.targetId)
    );
    return Promise.all(promises);
  },

  /**
   * Memuat dan mengembalikan konten HTML komponen tanpa menyisipkannya ke dalam DOM
   * @param {string} path - Path ke file komponen HTML
   * @returns {Promise<string>} - Promise yang menyelesaikan dengan HTML komponen
   */
  fetchComponent: async function (path) {
    try {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch component from ${path}: ${response.status} ${response.statusText}`
        );
      }

      return await response.text();
    } catch (error) {
      console.error(`Error fetching component: ${error.message}`);
      return null;
    }
  },
};

export default ComponentLoader;
