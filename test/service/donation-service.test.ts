import {
  getDonationById,
  getDonationsByCampaign,
  createDonation,
  CreateDonationParams,
} from '../../src/service/donation-service';
import {
  createCampaign,
  CreateCampaignParams,
  getCampaignById,
} from '../../src/service/campaign-service';
import { CampaignType, DonationType } from '../../src/repository/schema';

describe('Test donation service', () => {
  it('should register a donation', async () => {
    const campaign = await createDummyCampaign();

    const donationParams: CreateDonationParams = {
      categoryId: campaign.categoryId,
      campaignId: campaign.campaignId,
      transactionId: 'transaction1',
      conversationId: 'conversation1',
      responseCode: 'TS0',
      userPhone: 841234567,
      amount: 600,
    };

    const donation = await createDonation(donationParams);

    expect(donation).toBeTruthy();
    expect(donation.campaignId).toBe(donationParams.campaignId);
    expect(donation.categoryId).toBe(donationParams.categoryId);
    expect(donation.transactionId).toBe(donationParams.transactionId);
    expect(parseInt(donation.userPhone)).toBe(donationParams.userPhone);
    expect(donation.amount).toBe(donationParams.amount);
  });

  it('should check if amount increments after donation', async () => {
    const campaignBeforeDonation = await createDummyCampaign();
    const donatedAmount = 3000;

    await createDummyDonation(campaignBeforeDonation, donatedAmount);

    const campaignAfterDonation = await getCampaignById(
      campaignBeforeDonation.categoryId,
      campaignBeforeDonation.campaignId
    );

    expect(campaignAfterDonation.totalDonations).toBe(
      campaignBeforeDonation.totalDonations + 1
    );
    expect(campaignAfterDonation.totalAmount).toBe(
      campaignBeforeDonation.totalAmount + donatedAmount
    );
  });

  it('should get donation by id', async () => {
    const campaign = await createDummyCampaign();
    const dummyDonation = await createDummyDonation(campaign);

    const foundDonation = await getDonationById(
      dummyDonation.campaignId,
      dummyDonation.transactionId
    );

    expect(foundDonation).toBeTruthy();
    expect(foundDonation?.campaignId).toBe(dummyDonation.campaignId);
    expect(foundDonation?.transactionId).toBe(dummyDonation.transactionId);
  });

  it('should get donation history', async () => {
    const campaign = await createDummyCampaign();
    for (const id of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
      await createDummyDonation(campaign, id);
    }
    const page1 = await getDonationsByCampaign(
      campaign.campaignId,
      6,
      undefined
    );
    expect(page1.length).toBe(6);

    const page2 = await getDonationsByCampaign(
      campaign.campaignId,
      6,
      page1[page1.length - 1].transactionId
    );
    expect(page2.length).toBe(4);
  });
});

async function createDummyCampaign(): Promise<CampaignType> {
  const campaignParams: CreateCampaignParams = {
    categoryId: 'educacao',
    userId: 'achaquisse1@gmail.com',
    userData: {
      fullName: 'Américo Tinga Chaquisse',
      pictureUrl:
        'https://i1.sndcdn.com/avatars-eihxIuzFW0OqgZjj-yVE8uQ-t240x240.jpg',
    },
    title: 'Construcao de uma escola',
    description: 'Long description',
    profileImage: 'http://localhost/main.png',
    additionalImages: [],
    targetAmount: 50000,
    targetDate: '2022-10-01',
  };

  return await createCampaign(campaignParams);
}

async function createDummyDonation(
  campaign: CampaignType,
  amount?: number | undefined
): Promise<DonationType> {
  const donationParams: CreateDonationParams = {
    categoryId: campaign.categoryId,
    campaignId: campaign.campaignId,
    transactionId:
      amount != undefined ? `transaction1${amount}` : 'transaction1',
    conversationId: 'conversation1',
    responseCode: 'TS0',
    userPhone: 841234567,
    amount: amount != undefined ? amount : 600,
  };

  return await createDonation(donationParams);
}
