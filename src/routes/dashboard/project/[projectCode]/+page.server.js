import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
import { redirect } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

dotenv.config();

const client = new MongoClient(process.env.MONGODB);
const userDb = client.db('user');
const projectDb = client.db('project');
const userInfo = userDb.collection('user_info');
const individualProject = projectDb.collection('project_individual');

export const load = async (event) => {
    const session = await event.locals.getSession();
    if(!session?.user) {
        throw redirect(302, '/?signedOut');
    }
    const params = await event.params;
    if(!params?.projectCode) {
        throw redirect(302, '/dashboard?invalidToken');
    }

    const projectInfo = await individualProject.findOne({
        join_code: params.projectCode,
    }, {projection: {_id: 0}});
    if(!projectInfo) {
        throw redirect(302, '/dashboard?invalidToken');
    }

    return {projectInfo: projectInfo};
}