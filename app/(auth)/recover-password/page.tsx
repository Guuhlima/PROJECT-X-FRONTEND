import RecoverPasswordClient from "./components/RecoverPasswordClient";

interface RecoverPasswordPageProps {
  searchParams?: {
    token?: string | string[];
  };
};

export default async function Page({
  searchParams,
}: RecoverPasswordPageProps) {
  const resolvedSearchParams = await searchParams;
  const tokenValue = resolvedSearchParams?.token;
  const token = Array.isArray(tokenValue) ? tokenValue[0] ?? "" : tokenValue ?? "";

  return <RecoverPasswordClient token={token.trim()} />;
}
