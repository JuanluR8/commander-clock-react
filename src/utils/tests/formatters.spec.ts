import { formatTime } from '../formatters'
import { MINUTE_IN_MS } from '@/constants'

import { describe, expect, it } from "vitest";

describe('formatters', () => {

    it('formatTime - should return hh:mm format', () => {
        const input = MINUTE_IN_MS * 5

        expect(formatTime(input)).toMatch(/\d{2}:\d{2}/)
    })

    it('formatTime - should return with format mm:ss', () => {
        const input = MINUTE_IN_MS * 5

        expect(formatTime(input)).toBe('05:00')
        expect(formatTime(input - 5000)).toBe('04:55')
    })
});
