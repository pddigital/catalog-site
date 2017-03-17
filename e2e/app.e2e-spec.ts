import { Catalog2Page } from './app.po';

describe('catalog2 App', () => {
  let page: Catalog2Page;

  beforeEach(() => {
    page = new Catalog2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
