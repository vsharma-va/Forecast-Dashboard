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
    if (!session?.user) {
        throw redirect(302, '/?signedOut');
    }

    let foundUser = await userInfo.findOne({
        email: session.user.email
    }, {projection: {_id: 0}});
    if (!foundUser) {
        return { foundUser: false };
    }

    let foundProjects = await individualProject.find({
        user_list: foundUser.email,
    }, { projection: { _id: 0 } }).toArray();
    if (foundProjects.length === 0) {
        return { foundUser: true, userInfo: foundUser, projectsFound: false };
    }
    return { foundUser: true, userInfo: foundUser, projectsFound: true, projectInfo: foundProjects };
}

export const actions = {
    registerWithJoinTeam: async (event) => {
        const formData = await event.request.formData();
        const session = await event.locals.getSession();
        if (!session?.user) {
            throw redirect(302, '/?signedOut');
        }
        let foundUser = await userInfo.findOne({
            email: session.user.email
        })
        let displayName = formData.get('userDisplayName');
        let joinCode = formData.get('joinCode');
        if (!foundUser) {
            await userInfo.insertOne({
                email: session.user.email,
                display_name: displayName,
            })
        }

        let foundProject = await individualProject.findOne({
            join_code: joinCode,
        })
        if (!foundProject) {
            return fail(400, { error: true, errorDetails: 'Project not found. Check the join code and try again' });
        }
        await individualProject.updateOne({
            join_code: foundProject.join_code,
        }, { $push: { user_list: session.user.email } })
        throw redirect(302, '/dashboard?success=true');
    }
}
