import {parameters, SERVER_APP, SERVER_HOST, SERVER_PORT, SERVER_PROTOCOL, ServerError} from "@/components/gen/common";
import {PATH} from "@/components/gen/stub/UserStub";
import {deserializeUser, User} from "@/components/gen/bean/User";

async function status(): Promise<{ statusCode: number; user: User }> {
    const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}_status`, {
        method: 'GET',
        credentials: 'include',
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
    });
    if (response.status < 400)
        return {
            statusCode: response.status,
            user: deserializeUser(await response.text())
        };
    else
        throw new ServerError(response.status);
}

async function signin(from: string, alias: string, pswd: string): Promise<{ statusCode: number; user: User }> {
    const dict = Object();
    dict.from = from;
    dict.alias = alias;
    dict.pswd = pswd;
    const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}_signin${parameters(dict)}`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
    });
    if (response.status < 400)
        return {
            statusCode: response.status,
            user: deserializeUser(await response.text())
        };
    else
        throw new ServerError(response.status);
}

async function password(o: string, n: string): Promise<{ statusCode: number }> {
    const dict = Object();
    dict.old = o;
    dict.new = n;
    const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}_password${parameters(dict)}`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
    });
    if (response.status < 400)
        return {
            statusCode: response.status,
        };
    else
        throw new ServerError(response.status);
}

async function reset(usid: number): Promise<{ statusCode: number }> {
    const dict = Object();
    dict.usid = usid;
    const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}_reset${parameters(dict)}`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
    });
    if (response.status < 400)
        return {
            statusCode: response.status,
        };
    else
        throw new ServerError(response.status);
}

async function signout(): Promise<{ statusCode: number }> {
    const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}_signout`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
    });
    if (response.status < 400)
        return {statusCode: response.status};
    else
        throw new ServerError(response.status);
}

export {
    status,
    signin,
    password,
    reset,
    signout
}