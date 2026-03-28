/**
 * =========================================
 * STORAGE KEY CONSTANT
 * =========================================
 * Central key used for storing links in Chrome storage
 */
const STORAGE_KEY = "quick_links";

/**
 * =========================================
 * GET ALL LINKS
 * =========================================
 * Fetches stored links from Chrome storage.
 * If no data exists, initializes with defaults.
 */
export async function getLinks() {
  return new Promise((resolve) => {
    chrome.storage.sync.get([STORAGE_KEY], (result) => {
      let data = result[STORAGE_KEY];

      /**
       * If no data exists → initialize defaults
       */
      if (!data) {
        data = {
          GitHub: { url: "https://github.com" },
          LinkedIn: { url: "https://linkedin.com" }
        };

        // Persist default data so it's consistent
        chrome.storage.sync.set({ [STORAGE_KEY]: data });
      }

      resolve(data);
    });
  });
}

/**
 * =========================================
 * SAVE NEW LINK
 * =========================================
 * Adds a new link to storage.
 *
 * @param {string} name - Display name of the link
 * @param {string} url - URL of the link
 */
export async function saveLink(name, url) {
  return new Promise((resolve) => {
    chrome.storage.sync.get([STORAGE_KEY], (result) => {
      const data = result[STORAGE_KEY] || {};

      /**
       * Add / overwrite link
       */
      data[name] = {
        url,
        createdAt: Date.now()
      };

      chrome.storage.sync.set({ [STORAGE_KEY]: data }, () => {
        resolve();
      });
    });
  });
                     }
