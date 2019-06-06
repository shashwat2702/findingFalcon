import axios from 'axios';
import { getData, postData } from './apiCalls';

const mockPosts = {
  'J K Rowling': [
    {
      Author: 'J K Rowling',
      id: 10,
      Name: 'Harry Potter and the Sorcerers Stone (Harry Potter, #1)',
      rating: 4.45,
    },
  ],
  'Sidney Sheldon': [
    {
      Author: 'Sidney Sheldon',
      id: 80,
      Name: 'If Tomorrow Comes (Tracy Whitney Series, #1)',
      rating: 4.02,
    },
  ],
};

describe('getData () :', () => {
  let getMock;
  beforeAll(() => {
    getMock = jest.spyOn(axios, 'get');
    getMock.mockImplementation(() => Promise.resolve(mockPosts));
  });
  afterAll(() => {
    getMock.mockRestore();
  });
  it('should return mockPosts', async () => {
    const result = await getData('http://localhost:8080/books');
    expect(result).toEqual(mockPosts);
    expect(getMock).toHaveBeenCalledWith('http://localhost:8080/books');
  });
});

describe('postData () :', () => {
  let postMock;
  const headers = { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } };
  beforeAll(() => {
    postMock = jest.spyOn(axios, 'post');
    postMock.mockImplementation(() => Promise.resolve(mockPosts));
  });
  afterAll(() => {
    postMock.mockRestore();
  });
  it('should return mockPosts', async () => {
    const result = await postData('http://localhost:8080/books', 'key');
    expect(result).toEqual(mockPosts);
    expect(postMock).toHaveBeenCalledWith('http://localhost:8080/books', 'key', headers);
  });
});
