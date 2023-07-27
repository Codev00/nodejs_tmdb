import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const personDetail = async (req, res) => {
   try {
      const { personId } = req.params;
      const response = await tmdbApi.personDetail({
         personId,
      });
      responseHandler.ok(res, response);
   } catch (error) {
      responseHandler.error(res);
   }
};

const personMedia = async (req, res) => {
   try {
      const { personId } = req.params;
      const medias = await tmdbApi.personMedia({
         personId,
      });
      responseHandler.ok(res, medias);
   } catch (error) {
      responseHandler.error(res);
   }
};

export default {
   personDetail,
   personMedia,
};
