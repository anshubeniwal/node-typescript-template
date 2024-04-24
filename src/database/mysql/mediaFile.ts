import { runQuery } from '@utils/mysql';
import { logger } from '@utils/logger';
export default class MediaFileModel {
  public async getFiles(data = null) {
    const results = [];
    if (!data) {
      return results;
    }
    let sql: string;
    sql = `SELECT media_files.*
    FROM media_files
    WHERE 1`;
    if (data && data.object_id) {
      sql += ` AND media_files.object_id =  ${data.lead_id} `;
    }
    if (data.file_name && data) {
      sql += `AND media_files.file_name = ${data.file_name} `;
    }

    if (data.media_file_id && data) {
      sql += `AND media_files.id = ${data.media_file_id} `;
    }

    if (data.object_type && data) {
      sql += `AND media_files.object_type = ${data.object_type} `;
    }

    if (data.doc_type && data) {
      sql += `AND media_files.doc_type = ${data.doc_type} `;
    }

    if (data.status >= 0 && data.status) {
      sql += `AND status = ${data.status} `;
    }
    try {
      const ubdateObjResp = await runQuery(sql);

      return ubdateObjResp[0];
    } catch (error) {
      logger.error(error);
    }
  }
}
