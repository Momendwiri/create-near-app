import * as show from '../src/messages';
import SpyInstance = jest.SpyInstance;
import {Contract, Frontend, TestingFramework} from '../src/types';

describe('messages', () => {
  let showSpy: SpyInstance;
  test('snapshot basic messages', () => {
    showSpy = jest.spyOn(show, 'show').mockImplementation(() => {});
    show.welcome();
    show.setupFailed();
    show.argsError();
    show.windowsWarning();
    show.creatingApp();
    show.depsInstall();
    show.depsInstallError();
    expect(showSpy.mock.calls).toMatchSnapshot();
    showSpy.mockClear();

  });

  test('snapshot messages with params', () => {
    showSpy = jest.spyOn(show, 'show').mockImplementation(() => {});

    show.successContractToText('js');
    show.successContractToText('rust');

    show.successFrontendToText('next');
    show.successFrontendToText('vanilla');
    show.successFrontendToText('none');

    show.unsupportedNodeVersion('55.789');
    show.directoryExists('/a/b/c/d');

    expect(showSpy.mock.calls).toMatchSnapshot();
    showSpy.mockClear();
  });

});

describe('test success message', () => {
  let showSpy;
  const contracts: Contract[] = ['js', 'rust', 'none'];
  const frontends: Frontend[] = ['next', 'vanilla', 'none'];
  const tests: TestingFramework[] = ['ts', 'rs'];
  const install = [true, false];
  // all combinations of the above
  const testMatrix = contracts.flatMap(c => frontends.flatMap(f => tests.flatMap(t => install.map(i => ([c, f, t, i])))));
  describe('test matrix', () => {
    test.each(testMatrix)('%o %o %o %o', (c: Contract, f: Frontend, t: TestingFramework, i: boolean) => {
      showSpy = jest.spyOn(show, 'show').mockImplementation(() => {});
      show.setupSuccess('my_project_name', c, f, i);
      expect(showSpy.mock.calls).toMatchSnapshot();
      showSpy.mockClear();
    });
  });
});
