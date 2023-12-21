'use client'
import { atom } from 'jotai';

export const atomSidebarActive = atom(false);
export const atomTagList = atom<string[]>([]);

export const atomTokenExist = atom<boolean>(false)
//Don't remove tokenExist. It is used to render correct navbar, and used in useEffect dependency.
// If removed, may cause incorrect navbar render