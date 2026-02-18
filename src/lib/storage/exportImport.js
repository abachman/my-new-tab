const EXPORT_VERSION = 1
const EXPORT_SOURCE = "my-new-tab"

// Keys to exclude from export (transient data)
const EXCLUDED_KEYS = ["weathers", "feeds", "forms"]

/**
 * Prepares state data for export by filtering transient data and adding metadata
 */
export function prepareExportData(state) {
  const data = {}

  Object.keys(state).forEach((key) => {
    if (!EXCLUDED_KEYS.includes(key)) {
      data[key] = state[key]
    }
  })

  return {
    meta: {
      version: EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      source: EXPORT_SOURCE,
    },
    data,
  }
}

/**
 * Validates imported data structure and version
 * Returns { valid: true, data } or { valid: false, error: string }
 */
export function validateImportData(data) {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "The selected file is not valid JSON" }
  }

  if (!data.meta || !data.meta.source) {
    return { valid: false, error: "This file is not a My New Tab backup" }
  }

  if (data.meta.source !== EXPORT_SOURCE) {
    return { valid: false, error: "This file is not a My New Tab backup" }
  }

  if (data.meta.version > EXPORT_VERSION) {
    return {
      valid: false,
      error: "This backup was created with a newer version",
    }
  }

  if (!data.data || typeof data.data !== "object") {
    return { valid: false, error: "This backup file is incomplete" }
  }

  return { valid: true, data: data.data }
}

/**
 * Triggers a browser download of the data as a JSON file
 */
export function downloadAsFile(data, filename) {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

/**
 * Reads a File object and parses it as JSON
 * Returns a Promise that resolves with the parsed data or rejects with an error
 */
export function readFileAsJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        resolve(data)
      } catch (e) {
        reject(new Error("The selected file is not valid JSON"))
      }
    }

    reader.onerror = () => {
      reject(new Error("Failed to read the file"))
    }

    reader.readAsText(file)
  })
}
