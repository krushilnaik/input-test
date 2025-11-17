// Cache environment checks at module level to avoid repeated feature detection
const HAS_BUFFER = typeof Buffer !== "undefined";
const HAS_TEXT_ENCODER = typeof TextEncoder !== "undefined";
const HAS_TEXT_DECODER = typeof TextDecoder !== "undefined";
const HAS_BTOA = typeof btoa !== "undefined";
const HAS_ATOB = typeof atob !== "undefined";

/**
 * Escapes HTML attribute values by replacing special characters with HTML entities
 */
export function escapeAttr(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
}

/**
 * Browser-compatible base64 encoding
 */
export function base64Encode(str: string): string {
	if (HAS_BUFFER) {
		return Buffer.from(str, "utf8").toString("base64");
	}
	// Browser fallback using TextEncoder (modern, supports Unicode)
	if (HAS_TEXT_ENCODER) {
		const encoder = new TextEncoder();
		const bytes = encoder.encode(str);
		// Convert Uint8Array to base64
		let binary = "";
		for (const byte of bytes) {
			binary += String.fromCharCode(byte);
		}
		return btoa(binary);
	}
	// Fallback: use btoa directly (may not handle all Unicode correctly)
	if (HAS_BTOA) {
		try {
			return btoa(str);
		} catch {
			// If btoa fails (non-ASCII), use URI encoding workaround without deprecated unescape
			return btoa(
				decodeURIComponent(
					encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
						String.fromCharCode(Number.parseInt(p1, 16)),
					),
				),
			);
		}
	}
	// Last resort fallback
	return encodeURIComponent(str).replace(/%0A/g, "\n").replace(/%20/g, " ");
}

/**
 * Decodes base64-encoded data prop for molecule components
 */
export function decodeDataProp(data?: string): string {
	if (!data) return "";
	try {
		// Try to decode as base64 (molecules use base64 encoding)
		if (HAS_BUFFER) {
			return Buffer.from(data, "base64").toString("utf8");
		}
		// Browser fallback using TextDecoder (modern, supports Unicode)
		if (HAS_TEXT_DECODER && HAS_ATOB) {
			try {
				const binary = atob(data);
				const bytes = new Uint8Array(binary.length);
				for (let i = 0; i < binary.length; i++) {
					bytes[i] = binary.charCodeAt(i);
				}
				const decoder = new TextDecoder();
				return decoder.decode(bytes);
			} catch {
				// If atob fails due to malformed base64, return as-is
				return data;
			}
		}
		// Fallback: manual conversion without deprecated escape
		if (HAS_ATOB) {
			try {
				const binary = atob(data);
				let result = "";
				for (let i = 0; i < binary.length; i++) {
					result += String.fromCharCode(binary.charCodeAt(i));
				}
				return result;
			} catch {
				// If atob fails due to malformed base64, return as-is
				return data;
			}
		}
		return data;
	} catch {
		// If decoding fails, return as-is (might be JSON for charts)
		return data;
	}
}
