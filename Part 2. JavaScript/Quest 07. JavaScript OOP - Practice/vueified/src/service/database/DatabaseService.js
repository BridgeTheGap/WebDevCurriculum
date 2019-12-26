export default class DatabaseService {
  /**
   * 디렉토리 상의 파일 목록을 불러옴. 
   * @param {string} path 경로 string. `/path/to/directory` 형식.
   * @returns {Promise<Object>} `converterList`의 플러그인이 전부 적용된 데이터가 반환.
   * @throws `INVALID_ARGUMENT` 경로에 파일이 없을 경우.
   */
  loadContentsAtPath(path) { throw 'subclass'; }

  /**
   * `String` 형식으로 변환한 데이터를 저장.
   * @param {string} path 경로 string. `/path/to/directory' 형식
   * @param {string} content string 형식으로 변환한 데이터. 형식에 제한이 없으며 converting은 caller의 책임.
   */
  writeContentToPath(path, content) { throw 'subclass'; }

  /**
   * 경로의 파일 또는 디렉토리를 삭제.
   * @param {string} path 삭제할 경로.
   */
  removeFileAtPath(path) { throw 'subclass'; }

  /**
   * 경로에 파일이 있는지 확인 (디렉토리 포함).
   * @param {string} path 경로.
   */
  hasFileAtPath(path) { throw 'subclass'; }
}