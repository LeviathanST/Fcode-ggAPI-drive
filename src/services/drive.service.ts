import { Body, Injectable, InternalServerErrorException } from '@nestjs/common';
import { createReadStream } from 'fs';
import { google, drive_v3 } from 'googleapis';

@Injectable()
export class DriveService {
    /**
     * Authenticate with Google using the access token
     * @param {string} accessToken 
     * @returns {drive_v3.Drive} Google Drive API client instance.
     */
    private authenticate(accessToken: string): drive_v3.Drive {
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token: accessToken });

        const drive = google.drive({
            version: 'v3',
            auth: oauth2Client,
        });

        return drive;
    }

    /**
     * Lists files in the user's Google Drive.
     * @param {string} accessToken 
     * @returns {Promise<drive_v3.Schema$FileList>} A list of files.
     */
    async listFiles(accessToken: string): Promise<drive_v3.Schema$FileList> {
        const drive = this.authenticate(accessToken);

        const response = await drive.files.list({
            pageSize: 10, // Number of files to list.
            fields: 'nextPageToken, files(id, name)', // Fields to return for each file.
        });

        console.log(response.data);


        return response.data;
    }

    async uploadFile(accessToken: string, filePath: string, mimeType: string, fileName: string) {
        const drive = this.authenticate(accessToken);

        const metadata = {
            name: fileName // File's name will be displayed in drive
        };


        const media = {
            mimeType: mimeType,
            body: createReadStream(filePath)
        }

        try {
            const response = await drive.files.create({
                requestBody: metadata,
                media: media,
                fields: 'id'
            })

            return response.data;
        } catch (err) {
            throw new InternalServerErrorException();
        }
    }
}