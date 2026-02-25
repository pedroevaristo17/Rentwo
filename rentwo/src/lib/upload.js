import { supabase } from "./supabase";

export async function uploadAvatar(file) {
  const ext = file.name.split(".").pop();
  const fileName = `me_${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      upsert: false, // 👈 MUDE AQUI
      contentType: file.type, // 👈 recomendado
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  return data.publicUrl;
}