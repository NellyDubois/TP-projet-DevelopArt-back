import configurationDatamapper from "../datamapper/configuration.js";
import { manageResponse } from "../utils/controllerUtils.js";


const configurationController = {
    
    async getConfigurationByArtistId(req, res, next) {
        
        const artist_id=req.params.artiste_id;
        const { result, error } = await configurationDatamapper.getConfigurationByArtistId(req.params.artiste_id);
        
        manageResponse(res, result, error, next);
    },

    async updateConfigurationByArtistId(req, res, next) {

        const artist_id=req.params.artiste_id;
        const {font_type, background_color,background_color_nav, cursor, font_color, layout,banner, logo, facebook_flag, insta_flag, twitter_flag, youtube_flag}=req.body;
        
        const { result, error } = await configurationDatamapper.updateConfigurationByArtistId(artist_id, font_type, background_color,background_color_nav, cursor, font_color, layout, banner, logo, facebook_flag, insta_flag, twitter_flag, youtube_flag);
        manageResponse(res, result, error, next);
    }
    
};

export default configurationController;