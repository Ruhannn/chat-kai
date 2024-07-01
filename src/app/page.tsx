import Chat from "@/components/chat";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Popover>
        <PopoverContent align="start" className="w-[440px] mr-4">
          <Chat />
        </PopoverContent>
        <PopoverTrigger asChild className="fixed bottom-4 right-4">
          <Button
            variant="outline"
            className="w-16 h-16 transition-all duration-300 bg-white rounded-full aspect-square">
            <MessageCircle size={40} className="text-black " />
          </Button>
        </PopoverTrigger>
      </Popover>
    </div>
  );
}
