/** @format */

export const selectCampaignIds = (state) =>
	state.dashboard.campaigns.map((campaign) => campaign.id);
