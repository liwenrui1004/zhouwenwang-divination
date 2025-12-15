/**
 * DeepSeek API 配置常量
 * 统一管理所有与 DeepSeek API 相关的配置
 */

/**
 * 应用API密钥配置
 * 如果在这里配置了API密钥，将优先使用此配置
 * 如果为空，则需要用户在设置中配置
 */
export const API_CONFIG = {
  // DeepSeek API密钥 - 可以在这里预配置，留空则需要用户在设置中配置
  DEEPSEEK_API_KEY: 'sk-da7a23fda7c647bebf97a1e6f5290fe9' as string, // 在这里填入您的 DeepSeek API 密钥，例如：'sk-xxxxx'
};

/**
 * DeepSeek API 配置
 */
export const DEEPSEEK_CONFIG = {
  // 模型配置
  MODELS: {
    // 主要模型 - 用于文本生成和分析
    PRIMARY: 'deepseek-chat',
    // DeepSeek 当前无官方视觉模型，视觉需求将提示不支持
    VISION: 'deepseek-chat',
    // 备用模型（如果主模型不可用）
    FALLBACK: 'deepseek-chat'
  },
  
  // API 端点配置
  ENDPOINTS: {
    CHAT_COMPLETIONS: 'https://api.deepseek.com/v1/chat/completions'
  },
  
  // 生成配置
  GENERATION_CONFIG: {
    // 创造性控制（与 OpenAI/DeepSeek 对齐）
    temperature: 0.7,
    // 最大输出令牌数
    max_tokens: 4096,
    // 采样策略参数
    top_p: 1
  },
  
  // 请求配置
  REQUEST_CONFIG: {
    // 标准超时时间（文本生成）
    TIMEOUT: 30000, // 30秒
    // 图像分析超时时间（占位）
    VISION_TIMEOUT: 60000, // 60秒
    // API密钥验证超时时间
    VALIDATION_TIMEOUT: 10000, // 10秒
  },
  
  // 文件配置（保留供前端校验）
  FILE_CONFIG: {
    // 支持的图像格式
    SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    // 最大文件大小（2MB）
    MAX_FILE_SIZE: 2 * 1024 * 1024,
  }
} as const;

/**
 * 构建 DeepSeek 请求头
 * @param apiKey API密钥
 * @returns 请求头
 */
export function buildDeepSeekHeaders(apiKey: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  };
}

/**
 * 验证API密钥格式
 * @param apiKey API密钥
 * @returns 是否为有效格式
 */
export function isValidApiKeyFormat(apiKey: string): boolean {
  const trimmedKey = apiKey.trim();
  return trimmedKey.length >= 20 && trimmedKey.startsWith('sk-');
}

/**
 * 验证图像文件类型
 * @param mimeType 文件MIME类型
 * @returns 是否为支持的图像类型
 */
export function isSupportedImageType(mimeType: string): boolean {
  return (DEEPSEEK_CONFIG.FILE_CONFIG.SUPPORTED_IMAGE_TYPES as readonly string[]).includes(mimeType);
}

/**
 * 验证文件大小
 * @param fileSize 文件大小（字节）
 * @returns 是否在允许范围内
 */
export function isValidFileSize(fileSize: number): boolean {
  return fileSize > 0 && fileSize <= DEEPSEEK_CONFIG.FILE_CONFIG.MAX_FILE_SIZE;
}

/**
 * 获取API密钥
 * 优先使用配置中的API密钥，如果为空则从用户设置中获取
 * @param userApiKey 用户在设置中配置的API密钥
 * @returns 最终使用的API密钥
 */
export function getActiveApiKey(userApiKey?: string): string {
  // 优先使用配置中的API密钥
  if (API_CONFIG.DEEPSEEK_API_KEY && API_CONFIG.DEEPSEEK_API_KEY.trim().length > 0) {
    return API_CONFIG.DEEPSEEK_API_KEY.trim();
  }
  
  // 如果配置中没有，使用用户设置的API密钥
  return (userApiKey || '').trim();
}

/**
 * 检查是否有可用的API密钥
 * @param userApiKey 用户在设置中配置的API密钥
 * @returns 是否有可用的API密钥
 */
export function hasValidApiKey(userApiKey?: string): boolean {
  const activeKey = getActiveApiKey(userApiKey);
  return activeKey.length > 0 && isValidApiKeyFormat(activeKey);
} 

/**
 * 兼容旧代码的导出：保持原函数名/常量名，内部使用 DeepSeek 配置
 * 这样可以在不大规模改动调用方的前提下切换到 DeepSeek。
 */
export const GEMINI_CONFIG = DEEPSEEK_CONFIG;

export function buildGeminiApiUrl(
  _modelId: string,
  _apiKey: string,
  _endpoint: string = 'chat/completions'
): string {
  return DEEPSEEK_CONFIG.ENDPOINTS.CHAT_COMPLETIONS;
}

export function buildModelsListUrl(_apiKey: string): string {
  return DEEPSEEK_CONFIG.ENDPOINTS.CHAT_COMPLETIONS;
}