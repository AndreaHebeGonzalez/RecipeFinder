import { StateCreator } from "zustand";
import type { ErrorKind, ErrorSource, AppErrorType } from "../types";

export type ErrorSliceType = {
  appError: AppErrorType
  setAppError: (kind : ErrorKind, source: ErrorSource, generalMessage: string | null, tecnicalMessage: string | null, status?: number | null) => void
  resetAppError: () => void
}

export const creatorErrorSlice : StateCreator<ErrorSliceType> = (set) => ({
  appError: {
    hasError: false,
    kind: "unexpected",
    source: "other",
    status: null,
    generalMessage: null,
    technicalMessage: null
  },

  setAppError: (kind, source, generalMessage, technicalMessage = null, status) => {

    const error: ErrorSliceType['appError'] = {
      hasError: true,
      kind,
      source,
      generalMessage,
      technicalMessage
    }

    if(status !== undefined) {
      error.status= status
    }

    set({
      appError: error
    })

  },
  resetAppError: () => {
    set({
      appError: {
        hasError: false,
        kind: "unexpected",
        source: "other",
        status: null,
        generalMessage: null,
        technicalMessage: null
      },
    })
  }
})