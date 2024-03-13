import { customAlphabet, nanoid } from 'nanoid';

const nanoidForName = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);

export function getUUName(): string{
    return nanoidForName()
}

export function getUUid() {
    return nanoid()
}
