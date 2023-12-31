'use client'
import { atom } from 'jotai';

export const atomSidebarActive = atom(false);
export const atomTagList = atom<string[]>([]);
export const atomSearchQuery = atom<string>("");

export const atomSearchDependency = atom<boolean>(false);
export const atomLoginDependency = atom<boolean>(false);
// atomDependencies acts as dependency for triggering useEffect in cross-component actions
