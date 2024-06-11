import { fail, redirect } from "@sveltejs/kit";
import {v4 as uuidv4} from "uuid";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB);
const projectDb = client.db('project');
const individualProject = projectDb.collection('project_individual');

export const load = async (event) => {
    const session = await event.locals.getSession();
    if(!session?.user){
        throw redirect('/?signedOut');
    }
}

export const actions = {
    createNewTeam: async (event) => {
        const formData = await event.request.formData();
        const session = await event.locals.getSession();
        let projectName = formData.get('projectName');
        let description = formData.get('projectDescription');
        console.log(projectName, description);
        if(!projectName || !description) {
            return fail(400, {error: true, errorDetails: 'Enter valid values for the fields'});
        }
        let generatedToken = uuidv4().toString().slice(29, 35);
        await individualProject.insertOne({
            name: projectName,
            description: description,
            owner: session.user.email,
            user_list: [session.user.email],
            join_code: generatedToken,
        })
        throw redirect(302, '/dashboard');
    }
}