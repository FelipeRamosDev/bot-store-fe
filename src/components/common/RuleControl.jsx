'use client';

import AuthUserContext from '@/contexts/AuthUser';
import { useContext } from 'react';

/**
 * RuleControl Component
 *
 * Conditionally renders children based on whether the authenticated user's
 * rules match any of the rules provided via the `rules` prop.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render when the user has access.
 * @param {string[]} [props.rules=[]] - List of allowed rule strings. An empty array grants access to everyone.
 * @param {React.ReactNode} [props.fallback=null] - Optional content to render when access is denied.
 *
 * @example
 * <RuleControl rules={['master', 'admin']}>
 *    <AdminPanel />
 * </RuleControl>
 */
export function RuleControl({ children, rules = [], fallback = null }) {
   const userAuth = useContext(AuthUserContext);
   const userRules = userAuth?.user?.rules || [];
   const hasAccess = rules.length === 0 || rules.some(rule => userRules.includes(rule));

   return hasAccess ? children : fallback;
}
