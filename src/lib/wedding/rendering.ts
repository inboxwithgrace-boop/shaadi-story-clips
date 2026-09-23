import type { WeddingProject } from "./types";

/**
 * Rendering layer — intentionally modular.
 *
 * Today this is a MOCK: no MP4 is produced and `videoUrl` stays null.
 * To connect a real renderer later, implement this same interface against a
 * server function / render service and swap the export below.
 */
export interface RenderJob {
  projectId: string;
  state: WeddingProject["render"]["state"];
  videoUrl: string | null;
  message: string;
}

export interface RenderService {
  submit(project: WeddingProject): Promise<RenderJob>;
  status(projectId: string): Promise<RenderJob>;
}

export const mockRenderService: RenderService = {
  async submit(project) {
    return {
      projectId: project.id,
      state: "queued",
      videoUrl: null,
      message: "Your video request is queued. Rendering has not started yet.",
    };
  },
  async status(projectId) {
    return {
      projectId,
      state: "queued",
      videoUrl: null,
      message: "Your video is being prepared.",
    };
  },
};

export const renderService: RenderService = mockRenderService;
