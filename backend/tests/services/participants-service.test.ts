import participantsService from '../../src/services/participants-service';
import participantsRepository from '../../src/repositories/participants-repository';
import { faker } from '@faker-js/faker';
import axios from 'axios';

jest.mock('../../src/repositories/participants-repository');

describe('insertIntoDB function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should insert new participants when no existing ones are found', async () => {
    (participantsRepository.getParticipantsFromDB as jest.Mock).mockResolvedValue(null);

    const data = [
      {
        name: faker.internet.userName(),
        logoUrl: faker.image.url(),
        discoveryUrl: faker.internet.url()
      }
    ];

    await participantsService.insertIntoDB(data);

    expect(participantsRepository.postParticipantsIntoDB).toHaveBeenCalledWith(data);
  });

  it('should insert only new participants when some already exist', async () => {
    const existingParticipants = [
      {
        name: faker.internet.userName(),
        logoUrl: faker.image.url(),
        discoveryUrl: faker.internet.url()
      }
    ];

    (participantsRepository.getParticipantsFromDB as jest.Mock).mockResolvedValue(existingParticipants);

    const newData = [
      {
        name: faker.internet.userName(),
        logoUrl: faker.image.url(),
        discoveryUrl: faker.internet.url()
      }
    ];

    await participantsService.insertIntoDB(newData);

    expect(participantsRepository.postParticipantsIntoDB).toHaveBeenCalledWith(newData);
  });
});

describe('returnCorrectJson function', () => {
  it('should correctly format participant data', async () => {
    const participantData = await axios.get(`${process.env.OPEN_BANKING}/participants`);

    const formattedData = await participantsService.returnCorrectJson(participantData);

    expect(formattedData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          logoUrl: expect.stringMatching(/^https?:\/\/\S+$/),
          discoveryUrl: expect.stringMatching(/^https?:\/\/\S+$/) || null,
        })
      ])
    );
  }, 20000);
});
