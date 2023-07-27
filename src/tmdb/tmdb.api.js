import axiosClient from "../axios/http.js";
import tmdbEndpoint from "./tmdb.endpoint.js";

const tmdbApi = {
   mediaList: async ({ mediaType, mediaCatogory, page }) =>
      await axiosClient.get(
         tmdbEndpoint.mediaList({ mediaType, mediaCatogory, page })
      ),
   mediaDetail: async ({ mediaType, page }) =>
      await axiosClient.get(tmdbEndpoint.mediaDetail({ mediaType, page })),
   mediaGenres: async ({ mediaType }) =>
      await axiosClient.get(tmdbEndpoint.mediaGenres({ mediaType })),
   mediaCredits: async ({ mediaType, mediaId }) =>
      await axiosClient.get(tmdbEndpoint.mediaCredits({ mediaType, mediaId })),
   mediaVideos: async ({ mediaType, mediaId }) =>
      await axiosClient.get(tmdbEndpoint.mediaVideos({ mediaType, mediaId })),
   mediaImages: async ({ mediaType, mediaId }) =>
      await axiosClient.get(tmdbEndpoint.mediaImages({ mediaType, mediaId })),
   mediaRecommend: async ({ mediaType, mediaId }) =>
      await axiosClient.get(
         tmdbEndpoint.mediaRecommend({ mediaType, mediaId })
      ),
   mediaSearch: async ({ mediaType, query, page }) =>
      await axiosClient.get(
         tmdbEndpoint.mediaSearch({ mediaType, query, page })
      ),
   personDetail: async ({ personId }) =>
      await axiosClient.get(tmdbEndpoint.personDetail({ personId })),

   personMedias: async ({ personId }) =>
      await axiosClient.get(tmdbEndpoint.personMedias({ personId })),
};

export default tmdbApi;
